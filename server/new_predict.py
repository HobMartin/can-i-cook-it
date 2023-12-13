import torch
import torch.nn as nn
from torchvision import transforms
from pathlib import Path
from PIL import Image
import requests
from io import BytesIO
import json

BASE_DIR = Path(__file__).parent

model = torch.load(BASE_DIR / "model/effnetB5.pt", map_location="cpu")
model.eval()

with open(BASE_DIR / "food.json", "r") as f:
    classes = json.load(f)


def preprocess_image(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content)).convert("RGB")

    # Apply the same transformations used during training
    transform = transforms.Compose(
        [
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )

    img = transform(img)
    img = img.unsqueeze(0)  # Add batch dimension
    return img


def predict_image(model, image, classes):
    with torch.no_grad():
        output = model(image)
        _, predicted_class = torch.max(output, 1)
        confidence = torch.nn.functional.softmax(output, dim=1)[0] * 100
        accuracy = confidence[predicted_class].item()
        food_name = classes[predicted_class.item()]

    return accuracy, food_name


def predict(image_path):
    image = preprocess_image(image_path)
    accuracy, food_name = predict_image(model, image, classes)
    return {"food_name": food_name, "model_score": round(accuracy, 2)}
