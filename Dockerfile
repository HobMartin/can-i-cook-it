FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY server/ /app
WORKDIR /app