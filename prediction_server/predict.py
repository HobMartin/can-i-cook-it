from tensorflow import keras
from keras.preprocessing import image
import json
import numpy as np

model = keras.models.load_model("./model/mobilenetv2_tuned.h5")

f = open("food.json")

data = json.load(f)


def predict(image_path):
    img = keras.preprocessing.image.load_img(
        image_path, grayscale=False, color_mode="rgb", target_size=(224, 224)
    )
    x = keras.preprocessing.image.img_to_array(img)
    input_arr = np.expand_dims(x, axis=0)
    input_arr = keras.applications.mobilenet_v2.preprocess_input(input_arr)
    predictions = model.predict(input_arr)
    predictions = predictions.argmax(axis=1)
    return data[str(predictions[0])]
