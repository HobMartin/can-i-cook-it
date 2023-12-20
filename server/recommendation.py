import pandas as pd
import numpy as np
from random import sample
from collections import Counter
import ast
import re
import random
import pickle

# modelling & evaluation
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import NearestNeighbors
from sklearn.decomposition import TruncatedSVD
from sklearn.utils.extmath import randomized_svd
from sklearn.metrics import roc_auc_score
from get_data import get_data_from_supabase, get_receipt_by_id

get_data_from_supabase()

np.set_printoptions(suppress=True)
pd.options.display.float_format = "{:.2f}".format

all_recipes = pd.read_csv("./data/receipt.csv")
recipe_lookup = all_recipes[["receipt_id", "receipt_name"]]
all_recipes.drop_duplicates(inplace=True)
all_ratings = pd.read_csv("./data/rating.csv")
all_ratings.drop_duplicates(inplace=True)

at_least_3_ids = list(all_ratings[all_ratings["value"] >= 3].reset_index().user_id)
users3 = all_ratings[all_ratings.user_id.isin(at_least_3_ids)]
pickle.dump(users3, open("./pickle/users3.pkl", "wb"))


def create_X(df):
    """
    Generates a compressed sparse matrix "csm" dataframe.

    Args:
        df: pandas dataframe containing 3 columns (user_id, recipe_id, rating)

    Returns:
        X: sparse user-item matrix
        user_mapper: dict that maps user id's to user indices
        user_inv_mapper: dict that maps user indices to user id's
        recipe_mapper: dict that maps recipe id's to recipe indices
        recipe_inv_mapper: dict that maps recipe indices to movie id's

    X, user_mapper, recipe_mapper, user_inv_mapper, recipe_inv_mapper = create_X(users3)

    """
    M = df["user_id"].nunique()
    N = df["receipt_id"].nunique()

    user_mapper = dict(zip(np.unique(df["user_id"]), list(range(M))))
    recipe_mapper = dict(zip(np.unique(df["receipt_id"]), list(range(N))))

    user_inv_mapper = dict(zip(list(range(M)), np.unique(df["user_id"])))
    recipe_inv_mapper = dict(zip(list(range(N)), np.unique(df["receipt_id"])))

    user_index = [user_mapper[i] for i in df["user_id"]]
    item_index = [recipe_mapper[i] for i in df["receipt_id"]]

    X = csr_matrix((df["value"], (user_index, item_index)), shape=(M, N))

    return X, user_mapper, recipe_mapper, user_inv_mapper, recipe_inv_mapper


X, user_mapper, recipe_mapper, user_inv_mapper, recipe_inv_mapper = create_X(users3)

similarity_matrix = cosine_similarity(X, X)
pickle.dump(similarity_matrix, open("./pickle/similarity_matrix.pkl", "wb"))


class utils:
    def __init__(self, all_recipes):
        pass

    def get_complexity(title):
        """get_category("Chef John's Chicken Cacciatore")
        Return multiple categories to ensure it's not too niche"""
        df = all_recipes[["complexity", "title"]]
        my_complexity = df[df.title == title].complexity
        complexities = ast.literal_eval(my_complexity.values[0])
        return complexities

    def recipe_id_to_title(recipe_id):
        """recipe_id_to_title(223042) >>> 'Chicken Parmesan'"""
        df = all_recipes[["receipt_id", "receipt_name"]]
        my_title = df[df.receipt_id == recipe_id].receipt_name
        return my_title.values[0]

    def title_to_id(title):
        """title_to_id('Chicken Parmesan') >>> '223042'"""
        df = all_recipes[["recipe_id", "title"]]
        my_recipe = df[df.title == title].recipe_id
        return my_recipe.values[0]

    def strip_filler(str):
        """Remove filler words"""
        stop = ["chef", "john's"]
        words = [i for i in str.split() if i.lower() not in stop]
        return " ".join(words)

    def known_positives(user_id, threshold=4, new_user=None):
        """Return known positives, by default no new_user input
        new_user is a dictionary

        {'user_id': [8888888], 'recipe_id': [219936], 'rating': [5]}"""

        users = all_ratings[["user_id", "receipt_id", "value"]]
        users = pd.concat([users, pd.DataFrame(new_user)])

        user_preferences = pd.merge(users, recipe_lookup, on="receipt_id", how="left")
        known_positives = user_preferences[
            (user_preferences["user_id"] == user_id)
            & (user_preferences["value"] >= threshold)
        ]
        known_positives_list = list(known_positives.receipt_name)
        return known_positives_list

    def create_new_user(quiz_results):
        """quiz_results = ['Spicy Chicken Thai Soup']
        create_new_user(quiz_results)"""

        input = [utils.title_to_id(recipe) for recipe in quiz_results]
        new_user_id = [8888888] * len(input)
        new_user_recipe_ids = input
        new_user_ratings = [5] * len(input)

        new_user = {
            "user_id": new_user_id,
            "recipe_id": new_user_recipe_ids,
            "rating": new_user_ratings,
        }

        return new_user

    def count_complexities(all_recipes_df):
        """Returns a string of all unique categories of recipes
        count_categories(all_recipes)
        """
        all_recipes_df = all_recipes_df.dropna(axis=0, how="any")
        recipe_complexities = all_recipes.drop(
            ["receipt_name", "complexity", "ingredient", "step"], axis=1
        )
        complexities = []
        # ast.literal turns str rep of list into list
        # dropna otherwise we will experience errors with eval!
        for i in [j for j in all_recipes_df.complexity.dropna()]:
            complexities.extend([i])
        # print(complexities)
        complexities = list(set(complexities))
        for complexity in complexities:
            # print(all_recipes_df["complexity"].apply(lambda row: int(complexity in row)))
            recipe_complexities[complexity] = all_recipes_df["complexity"].apply(
                lambda row: int(complexity in row)
            )
            # print(recipe_complexities[complexity])

        return recipe_complexities.dropna().drop(["rating_receipt"], axis=1)

    def get_url(recipe_id):
        """url(220854)"""
        try:
            url = photo_urls.query(f"recipe_id=={recipe_id}").photo_url.values[0]
        except:  # image does not exist
            url = "https://png.pngtree.com/element_origin_min_pic/17/08/09/28d3afc4b9471eba6f908caf6943d473.jpg"
        return url

    def similar_to_cat(categories, top_N=10, all_recipes=all_recipes):
        """Return a sample of 6 of the top_N new recipes most similar to the chosen
        categories

        similar_to_cat(['Main Dish', 'Chicken', 'Chicken Cacciatore'])

        """
        sample_list = []
        matrix = utils.count_categories(all_recipes)
        for category in categories:
            try:
                recipes = list(matrix[matrix[category] == 1].recipe_id)
                sample_list.extend(recipes)
            except:
                pass
        return random.sample(sample_list, 6)


recipe_complexities = utils.count_complexities(all_recipes).iloc[:, 1:]
A = csr_matrix(recipe_complexities)
del recipe_complexities
cosine_sim = cosine_similarity(A, A)
pickle.dump(cosine_sim, open("./pickle/cosine_sim.pkl", "wb"))


class recommenders:
    def __init__(self):
        pass

    def sample_popular(n=24):
        """Return a sample of 12 of top 1000/1000+ recipes"""
        df = (
            all_ratings[["value", "receipt_id"]]
            .groupby("receipt_id")
            .count()
            .sort_values(by="value", ascending=False)
            .reset_index()
        )
        top_1000 = [get_receipt_by_id(thing) for thing in df[0:500].receipt_id]
        return sample(top_1000, n)

    def user_user_recommender(
        top_N,
        user_id,
        threshold=4,
        X_sparse=X,
        user_mapper=user_mapper,
        recipe_lookup=recipe_lookup,
        all_users=all_recipes,
        new_user=None,
    ):
        """Return a sample of 6 of top_N new recipes based on similar users

        X: sparse user-item utility matrix, not normalized

        recommenders.user_user_recommender(top_N=20, user_id=3936048)

        """

        similarity_matrix = pickle.load(open("./pickle/similarity_matrix.pkl", "rb"))
        user = user_mapper[user_id]
        # negate for most similar
        similar_users = np.argsort(-similarity_matrix[user])[
            1:11
        ]  # remove original user, peak at top 10 similar users
        sorted(-similarity_matrix[user])[1:]
        recommended_recipes = []
        # returns enough recipes ~100, so good coverage
        # loop through all users to get top_N items, only if the recipes > threshold
        for i in similar_users:
            similar_user = all_ratings[all_ratings["user_id"] == user_inv_mapper[i]]
            recommended_recipes.extend(
                list(similar_user[similar_user.value >= threshold].receipt_id)
            )

        picks = recommended_recipes[0:25]
        # print(picks)
        # convert recipe_id to title
        # picks = [
        #     recipe_lookup.loc[recipe_lookup["receipt_id"].isin([i])].receipt_id.values[
        #         0
        #     ]
        #     for i in picks
        # ]
        # remove already tried items
        new_picks = [
            pick
            for pick in picks
            if pick not in utils.known_positives(user_id, threshold, new_user)
        ]
        result = sample(set(new_picks), top_N - 1)
        # remove duplicates & sample 6
        return result

    def item_item_recommender(
        id,
        top_N=10,
        opposite=False,
        threshold=4,
        all_recipes=all_recipes,
        new_user=None,
        user_id=8888888,
    ):
        """Return a sample of 6 of top_N new recipes most similar to chosen recipe,
        by default top_N is 10, so items are very similar. Opposite=False by default.

        recommenders.item_item_recommender(title="Khachapuri (Georgian Cheese Bread)", opposite=True)
        recommenders.item_item_recommender(title="Khachapuri (Georgian Cheese Bread)", opposite=False)
        recommenders.item_item_recommender(title="Chef John's Italian Meatballs", new_user=utils.create_new_user(quiz_results))
        """

        cosine_sim = pickle.load(open("./pickle/cosine_sim.pkl", "rb"))

        recipe_idx = dict(zip(all_recipes["receipt_id"], list(all_recipes.index)))
        idx = recipe_idx[id]

        sim_scores = list(enumerate(cosine_sim[idx]))
        if opposite:
            sim_scores.sort(key=lambda x: x[1], reverse=False)
            sim_scores = sim_scores[
                1 : (top_N + 1)
            ]  # taking the first top_N makes it run a lot faster
            dissimilar_recipes_idx = [i[0] for i in sim_scores]
            picks = list(all_recipes["receipt_id"].iloc[dissimilar_recipes_idx])
            new_picks = [
                pick
                for pick in picks
                if pick not in utils.known_positives(user_id, threshold, new_user)
            ]
            return [get_receipt_by_id(id) for id in sample(new_picks[0:100], 6)]

        else:
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            sim_scores = sim_scores[1 : (top_N + 1)]
            similar_recipes_idx = [i[0] for i in sim_scores]
            picks = list(all_recipes["receipt_id"].iloc[similar_recipes_idx])
            # filter out items chosen, by default filter out new user 8888888
            new_picks = [
                pick
                for pick in picks
                if pick not in utils.known_positives(user_id, threshold, new_user)
            ]
            # choose the top 6 from ranked new_picks to display
            return sample(new_picks[0:10], 6)

    def svd_recommender(user_id, new_user=None, threshold=3):
        """
        Returns recommended sample of 6 of the top 10 recipes, over threshold rating for a particular user,
        using matrix factorization to find latent factors.

        Requires a lot vector to be filled out for non-zero results.

        ELI5: It makes a prediction of the rating (into lower dimensional space)

        top_N: number of similar recipe to retrieve, int | X_norm: user-item utility matrix |  user_id: original user_id, int
        user_mapper: user_mapper, df | user_preferences: df | threshold = rating threshold between 1 to 5 inclusive

        # existing user
        recommenders.svd_recommender(3936048)

        # new user
        recommenders.svd_recommender(8888888, new_user=new_user)
        """
        # for new user predictions
        if new_user != None:
            pd_new_user = pd.DataFrame(new_user)
            # concat new_user rows
            new_user_df = pd.concat([users3, pd_new_user])
            # create a X_new
            (
                X_new,
                user_mapper_new,
                recipe_mapper_new,
                user_inv_mapper_new,
                recipe_inv_mapper_new,
            ) = create_X(new_user_df)

            X = X_new
            user_mapper = user_mapper_new
            recipe_inv_mapper = recipe_inv_mapper_new
        else:
            (
                X,
                user_mapper,
                recipe_mapper,
                user_inv_mapper,
                recipe_inv_mapper,
            ) = create_X(users3)
            X = X
            user_mapper = user_mapper
            recipe_inv_mapper = recipe_inv_mapper

        # calculate mean_rating_per_recipe
        sum_ratings_per_recipe = X.sum(axis=0)
        n_ratings_per_recipe = X.getnnz(axis=0)
        mean_rating_per_recipe = sum_ratings_per_recipe / n_ratings_per_recipe
        X_mean_recipe = np.tile(mean_rating_per_recipe, (X.shape[0], 1))

        user = user_mapper[user_id]
        # remove item bias
        X_norm = X - csr_matrix(X_mean_recipe)

        svd = TruncatedSVD(n_components=2, random_state=42)
        Z = svd.fit_transform(X_norm)
        X_new = svd.inverse_transform(Z)
        # add back the mean so it's interpretable
        X_new = X_new + np.array(X_mean_recipe)

        top_N_indices = X_new[user].argsort()[::-1]

        # check that it's greater than a threshold
        mask = X_new[user][top_N_indices] > threshold
        num_greater_than = len(X_new[user][top_N_indices][mask])
        # indices in order
        top_N_indices = top_N_indices[:num_greater_than]
        recommended = []
        for i in top_N_indices:
            recipe_id = recipe_inv_mapper[i]
            recommended.append((recipe_id, utils.recipe_id_to_title(recipe_id)))

        picks = [recipe[0] for recipe in recommended[0:10]]

        # there may not always be more than 6 things > 4 rating
        if len(picks) >= 6:
            return sample(picks, 6)
        else:
            return picks
