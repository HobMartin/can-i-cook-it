from fastapi import FastAPI, UploadFile
from predict import predict

app = FastAPI()


def predict_image(image):
    result = predict(image)
    return result


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/predict/")
async def create_upload_file(file: UploadFile):
    file_location = f"files/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    result = predict_image(file_location)
    return {"food_name": result}
