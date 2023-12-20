import os
import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from inference import model_fn, input_fn, predict_fn, output_fn
from recommendation import recommenders, utils
from get_data import get_data_from_supabase, get_receipt_by_id

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


@app.get("/collect-data")
async def collect_data():
    try:
        get_data_from_supabase()
        return {"message": "Data collected"}
    except Exception as e:
        return {"error": str(e)}


@app.get("/top-recipes")
async def get_recommendation():
    try:
        result = recommenders.sample_popular(5)
        return result
    except Exception as e:
        return {"error": str(e)}


@app.get("/recommendation/{user_id}")
async def get_recommendation(user_id: str):
    try:
        user_rec = recommenders.user_user_recommender(5, user_id)
        svd_rec = recommenders.svd_recommender(user_id=user_id)
        all = user_rec + svd_rec
        all = set(all)
        hybrid_recommended = random.sample([x for x in all if x not in utils.known_positives(user_id)],6)
        return [get_receipt_by_id(id) for id in hybrid_recommended]
    except Exception as e:
        return {"error": str(e)}


@app.get("/recommendation/{user_id}/{recipe_id}")
async def get_recommendation(user_id: str, recipe_id: str):
    try:
        item_rec = recommenders.item_item_recommender(
            id=recipe_id, user_id=user_id, top_N=5
        )
        user_rec = recommenders.user_user_recommender(top_N=5, user_id=user_id)
        svd_rec = recommenders.svd_recommender(user_id=user_id)
        all = item_rec + user_rec + svd_rec
        all = set(all)
        hybrid_recommended = random.sample([x for x in all if x not in utils.known_positives(user_id)],5)
        return [get_receipt_by_id(id) for id in hybrid_recommended]
    except Exception as e:
        return {"error": str(e)}
