from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predict import predict

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def predict_image(image):
    result = predict(image)
    return result


@app.get("/")
async def root():
    return {"message": "Hello World"}


class Image(BaseModel):
    file: str


@app.post("/predict/")
async def create_upload_file(file: Image):
    result = predict_image(file.file)
    return {"food_name": result}
