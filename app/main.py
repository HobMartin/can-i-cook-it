from fastapi import FastAPI
from app.predict import predict

app = FastAPI()


def predict_image(image):
    result = predict(image)
    return result


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/predict/")
async def create_upload_file(file: str):
    result = predict_image(file)
    return {"food_name": result}
