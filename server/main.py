import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from inference import model_fn, input_fn, predict_fn, output_fn

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = model_fn(os.environ["SM_MODEL_DIR"])


def predict_image(image):
    input = input_fn(image)
    prediction = predict_fn(input, model)
    result = output_fn(prediction)
    return result


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/ping")
async def root():
    return "pong"


class Image(BaseModel):
    url: str


@app.post("/invocations")
async def create_upload_file(image: Image):
    try:
        result = predict_image(image.url)
        return result
    except Exception as e:
        return {"error": str(e)}
