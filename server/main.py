from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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


@app.post("/predict/")
async def create_upload_file(file: str):
    result = predict_image(file)
    return {"food_name": result}
