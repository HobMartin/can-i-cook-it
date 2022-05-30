from fastapi import FastAPI, UploadFile
from PIL import Image
import requests
from predict import predict

app = FastAPI()


def predict_image(image):
    result = predict(image)
    return result


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/predict/")
async def create_upload_file(file: str):
    image = Image.open(requests.get(url, stream=True).raw)
    result = predict_image(image)
    return {"food_name": result}
