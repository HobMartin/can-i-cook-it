from tensorflow import keras
import json
from pathlib import Path
import numpy as np
import os

BASE_DIR = Path(__file__).parent

model = keras.models.load_model(BASE_DIR / "model/mobilenetv2_tuned.h5")

f = open(BASE_DIR / "food.json")

data = json.load(f)


def predict(image_path):
    image_url = keras.utils.get_file("Food", origin=image_path)
    img = keras.preprocessing.image.load_img(
        image_url, grayscale=False, color_mode="rgb", target_size=(224, 224)
    )
    os.remove(image_url)
    x = keras.preprocessing.image.img_to_array(img)
    input_arr = np.expand_dims(x, axis=0)
    input_arr = keras.applications.mobilenet_v2.preprocess_input(input_arr)
    predictions = model.predict(input_arr)
    model_score = round(max(predictions[0]) * 100, 2)
    predictions = predictions.argmax(axis=1)
    return {"food_name": data[str(predictions[0])], "model_score": model_score}
