
from supabase import create_client, Client
import csv
import os

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_KEY"]

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def process_recipe(recipe_dict):
    # Extracting ingredient names
    ingredients = [ingredient["name"] for ingredient in recipe_dict["ingredient"]]

    # Extracting step descriptions
    steps = [step["description"] for step in recipe_dict["step"]]

    # Calculating the average rating
    ratings = [rating["value"] for rating in recipe_dict["rating_receipt"]]
    avg_rating = sum(ratings) / len(ratings) if ratings else 0

    processed_data = {
        "receipt_id": recipe_dict["id"],
        "receipt_name": recipe_dict["receipt_name"],
        "complexity": recipe_dict["complexity"],
        "ingredient": ingredients,
        "step": steps,
        "rating_receipt": avg_rating,
    }

    return processed_data


def get_data_from_supabase():
    receipts = (
        supabase.table("receipt")
        .select(
            "*,time_to_cook,complexity, step(description), ingredient(name), rating_receipt(value)"
        )
        .execute()
    )
    assert len(receipts.data) > 0

    result = []
    for receipt in receipts.data:
        proc = process_recipe(receipt)
        result.append(proc)

    keys = result[0].keys()

    with open("./data/receipt.csv", "w") as f:
        dict_writer = csv.DictWriter(f, keys)
        dict_writer.writeheader()
        dict_writer.writerows(result)

    users = (
        supabase.table("user")
        .select("auth_user, rating_receipt(value), favorites(*)")
        .execute()
    )
    assert len(users.data) > 0
    users.data

    rating = (
        supabase.table("rating_receipt")
        .select("receipt_id, value, user_id")
        .csv()
        .execute()
    )
    assert len(rating.data) > 0
    rating.data
    with open("./data/rating.csv", "w") as f:
        f.write(rating.data)


def get_receipt_by_id(id: str):
    receipt = (
        supabase.table("receipt")
        .select("id, receipt_name, image, rating_receipt(value)")
        .eq("id", id)
        .execute()
    )
    return receipt.data[0]
