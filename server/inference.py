import torch
import torch.nn as nn
from torchvision import transforms
import efficientnet_pytorch
from pathlib import Path
from PIL import Image
import requests
import json
import os
import logging

logger = logging.getLogger(__name__)


def model_fn(model_dir):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    logger.info("Loading the model.")
    print(torch.torch_version.internal_version)
    model = torch.load(os.path.join(model_dir, "effnetB5-v2.pt"), map_location=device)
    model.to(device).eval()
    logger.info("Done loading model")
    return model


def input_fn(image, content_type="application/json"):
    logger.info("Deserializing the input data.")
    if content_type == "application/json":
        logger.info(f"Image url: {image}")
        image_data = Image.open(requests.get(image, stream=True).raw).convert("RGB")

        image_transform = transforms.Compose(
            [
                transforms.Resize(size=256),
                transforms.CenterCrop(size=224),
                transforms.ToTensor(),
                transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
            ]
        )

        return image_transform(image_data).unsqueeze(0)
    raise Exception(
        f"Requested unsupported ContentType in content_type: {content_type}"
    )


def output_fn(prediction_output, accept="application/json"):
    logger.info("Serializing the generated output.")
    classes = {
        "0": "Apple pie",
        "1": "Baby back ribs",
        "2": "Baklava",
        "3": "Beef carpaccio",
        "4": "Beef tartare",
        "5": "Beet salad",
        "6": "Beignets",
        "7": "Bibimbap",
        "8": "Bread pudding",
        "9": "Breakfast burrito",
        "10": "Bruschetta",
        "11": "Caesar salad",
        "12": "Cannoli",
        "13": "Caprese salad",
        "14": "Carrot cake",
        "15": "Ceviche",
        "16": "Cheesecake",
        "17": "Cheese plate",
        "18": "Chicken curry",
        "19": "Chicken quesadilla",
        "20": "Chicken wings",
        "21": "Chocolate cake",
        "22": "Chocolate mousse",
        "23": "Churros",
        "24": "Clam chowder",
        "25": "Club sandwich",
        "26": "Crab cakes",
        "27": "Creme brulee",
        "28": "Croque madame",
        "29": "Cup cakes",
        "30": "Deviled eggs",
        "31": "Donuts",
        "32": "Dumplings",
        "33": "Edamame",
        "34": "Eggs benedict",
        "35": "Escargots",
        "36": "Falafel",
        "37": "Filet mignon",
        "38": "Fish and chips",
        "39": "Foie gras",
        "40": "French fries",
        "41": "French onion soup",
        "42": "French toast",
        "43": "Fried calamari",
        "44": "Fried rice",
        "45": "Frozen yogurt",
        "46": "Garlic bread",
        "47": "Gnocchi",
        "48": "Greek salad",
        "49": "Grilled cheese sandwich",
        "50": "Grilled salmon",
        "51": "Guacamole",
        "52": "Gyoza",
        "53": "Hamburger",
        "54": "Hot and sour soup",
        "55": "Hot dog",
        "56": "Huevos rancheros",
        "57": "Hummus",
        "58": "Ice cream",
        "59": "Lasagna",
        "60": "Lobster bisque",
        "61": "Lobster roll sandwich",
        "62": "Macaroni and cheese",
        "63": "Macarons",
        "64": "Miso soup",
        "65": "Mussels",
        "66": "Nachos",
        "67": "Omelette",
        "68": "Onion rings",
        "69": "Oysters",
        "70": "Pad thai",
        "71": "Paella",
        "72": "Pancakes",
        "73": "Panna cotta",
        "74": "Peking duck",
        "75": "Pho",
        "76": "Pizza",
        "77": "Pork chop",
        "78": "Poutine",
        "79": "Prime rib",
        "80": "Pulled pork sandwich",
        "81": "Ramen",
        "82": "Ravioli",
        "83": "Red velvet cake",
        "84": "Risotto",
        "85": "Samosa",
        "86": "Sashimi",
        "87": "Scallops",
        "88": "Seaweed salad",
        "89": "Shrimp and grits",
        "90": "Spaghetti bolognese",
        "91": "Spaghetti carbonara",
        "92": "Spring rolls",
        "93": "Steak",
        "94": "Strawberry shortcake",
        "95": "Sushi",
        "96": "Tacos",
        "97": "Takoyaki",
        "98": "Tiramisu",
        "99": "Tuna tartare",
        "100": "Waffles",
    }

    _, topclass = prediction_output.topk(3, 1)
    confidence = torch.nn.functional.softmax(prediction_output, dim=1)[0] * 100
    result = []
    for i in range(3):
        accuracy = confidence[topclass.cpu().numpy()[0][i]].item()
        food_name = classes[str(topclass.cpu().numpy()[0][i])]
        pred = {"prediction": food_name, "score": f"{round(accuracy, 2)}%"}
        result.append(pred)

    if accept == "application/json":
        return json.dumps(result), accept
    raise Exception(f"Requested unsupported ContentType in Accept: {accept}")


def predict_fn(input_data, model):
    logger.info("Generating prediction based on input parameters.")
    if torch.cuda.is_available():
        input_data = input_data.view(1, 3, 224, 224).cuda()
    else:
        input_data = input_data.view(1, 3, 224, 224)

    with torch.no_grad():
        model.eval()
        out = model(input_data)
        ps = torch.exp(out)

    return ps
