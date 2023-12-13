FROM python:3.9

COPY requirements.txt ./requirements.txt

RUN apt-get update && apt-get install -y gunicorn

# required for opencv
RUN pip install --no-cache-dir --upgrade -r requirements.txt
WORKDIR /app
COPY ./server/inference.py /app/inference.py
COPY ./server/main.py /app/main.py
EXPOSE 80

ENV SM_MODEL_DIR /opt/ml/model/code
COPY ./server/model/effnetB5-v2.pt $SM_MODEL_DIR/effnetB5-v2.pt 

# gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:80
ENTRYPOINT [ "gunicorn", "main:app", "--workers","4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:80", "-n"]
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80",'-n']