FROM pytorch/pytorch:2.1.0-cuda11.8-cudnn8-runtime

USER root
COPY requirements.txt ./requirements.txt

RUN apt-get update && apt-get install -y gunicorn cmake

# required for opencv
RUN pip install --no-cache-dir --upgrade -r requirements.txt
WORKDIR /app
COPY ./server .
EXPOSE 80
RUN mkdir -p ./data
RUN mkdir -p ./pickle

ENV SM_MODEL_DIR /opt/ml/model/code
COPY ./server/model/effnetB5.pt $SM_MODEL_DIR/effnetB5.pt 
ENV USE_NNPACK=0

# gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:80
ENTRYPOINT [ "gunicorn", "main:app", "--workers","4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:80"]
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80",'-n']