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
    model = torch.load(os.path.join(model_dir, "effnetB5.pt"), map_location=device)
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
    "0": "Яблучний пиріг",
    "1": "Спинка свиняча дитяча",
    "2": "Баклава",
    "3": "Беф карпаччо",
    "4": "Тартар із яловичини",
    "5": "Салат із буряка",
    "6": "Беньє",
    "7": "Бібімбап",
    "8": "Хлібний пудинг",
    "9": "Буріто зі сніданком",
    "10": "Брускетта",
    "11": "Цезарський салат",
    "12": "Каннолі",
    "13": "Капрезе",
    "14": "Морквяний торт",
    "15": "Севіче",
    "16": "Чізкейк",
    "17": "Сирний плато",
    "18": "Курка каррі",
    "19": "Куряча кесаділья",
    "20": "Курячі крильця",
    "21": "Шоколадний торт",
    "22": "Шоколадний мус",
    "23": "Чуррос",
    "24": "Суп з молюсків",
    "25": "Клубний сендвіч",
    "26": "Крабові котлети",
    "27": "Крем-брюле",
    "28": "Круасан з яйцем",
    "29": "Кекси",
    "30": "Начинені яйця",
    "31": "Пончики",
    "32": "Пельмені",
    "33": "Едамаме",
    "34": "Яйця Бенедикт",
    "35": "Ескарго",
    "36": "Фалафель",
    "37": "Філе-міньйон",
    "38": "Риба з смаженим картоплею",
    "39": "Фуа-гра",
    "40": "Картопля фрі",
    "41": "Цибульний суп французький",
    "42": "Тост французький",
    "43": "Смажений кальмар",
    "44": "Смажений рис",
    "45": "Морозиво йогуртове",
    "46": "Часниковий хліб",
    "47": "Ньоккі",
    "48": "Грецький салат",
    "49": "Шматочок тосту з сиром",
    "50": "Смажений лосось",
    "51": "Гуакамоле",
    "52": "Гьоза",
    "53": "Гамбургер",
    "54": "Гарячий і гострий суп",
    "55": "Хот-дог",
    "56": "Хуевос ранчерос",
    "57": "Гумус",
    "58": "Морозиво",
    "59": "Лазанія",
    "60": "Суп з лобстером",
    "61": "Рол з лобстером",
    "62": "Макарони з сиром",
    "63": "Макарони",
    "64": "Суп місо",
    "65": "Мідії",
    "66": "Начос",
    "67": "Омлет",
    "68": "Кільця цибулі",
    "69": "Устриці",
    "70": "Пад тай",
    "71": "Паялья",
    "72": "Млинці",
    "73": "Панакота",
    "74": "Пекінська качка",
    "75": "Фо",
    "76": "Піца",
    "77": "Свиняча котлета",
    "78": "Путін",
    "79": "Перша ребра",
    "80": "Сендвіч із вареної свинини",
    "81": "Рамен",
    "82": "Равіолі",
    "83": "Тістечко червоний барвник",
    "84": "Різотто",
    "85": "Самоса",
    "86": "Сашімі",
    "87": "Ковбаска",
    "88": "Салат із морських водоростей",
    "89": "Креветки і кукурудза",
    "90": "Спагеті болоньєз",
    "91": "Спагеті карбонара",
    "92": "Весняні роли",
    "93": "Стейк",
    "94": "Полуничний корж",
    "95": "Суші",
    "96": "Тако",
    "97": "Такоякі",
    "98": "Тірамісу",
    "99": "Тунець тартар",
    "100": "Вафлі"
    }

    topk, topclass = torch.topk(prediction_output,3, 1)
    confidence = torch.nn.functional.softmax(prediction_output, dim=1)[0] * 100
    result = []
    for i in range(3):
        accuracy = confidence[topclass.cpu().numpy()[0][i]].item()
        food_name = classes[str(topclass.cpu().numpy()[0][i])]
        pred = {'prediction': food_name, 'score': f'{round(accuracy, 2)}%'}
        result.append(pred)

    # Get the index of the maximum value in the prediction_output tensor
    # prediction_output = prediction_output[0]
    # top_class_index = torch.argmax(prediction_output).item()

    # # Get the corresponding class name and confidence score
    # top_class = classes[str(top_class_index)]
    # confidence = torch.nn.functional.softmax(prediction_output, dim=0)[top_class_index].item() * 100
    # result = {'prediction': top_class, 'score': f'{confidence:.2f}%'}
    if accept == "application/json":
        return result
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
