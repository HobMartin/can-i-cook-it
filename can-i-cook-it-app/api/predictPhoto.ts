import axios from "axios";

const API_BASE_URL = "https://lfqmthf5-80.euw.devtunnels.ms";

export const predictImage = async (image: string) => {
  try {
    console.log(image);

    const resp = await axios.post(
      `${API_BASE_URL}/invocations`,
      { url: image },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log(resp.data);

    return resp.data;
  } catch (e) {
    console.log("Error predictImage: " + e);
  }
};

export const getPopularRecipes = async () => {
  try {
    const resp = await axios.get(`${API_BASE_URL}/top-recipes`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return resp.data;
  } catch (e) {
    console.log("Error getPopularRecipes: " + e);
  }
};

export const getUserRecommendations = async (userId: string) => {
  try {
    const resp = await axios.get(`${API_BASE_URL}/recommendation/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(resp.data);

    return resp.data;
  } catch (e) {
    console.log("Error getUserRecommendations: " + e);
  }
};

export const getRecipeRecommendations = async (
  userId: string,
  recipeId: string
) => {
  try {
    const resp = await axios.get(
      `${API_BASE_URL}/recommendation/${userId}/${recipeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return resp.data;
  } catch (e) {
    console.log("Error getRecipeRecommendations: " + e);
  }
};

export const collectData = async () => {
  try {
    await axios.get(`${API_BASE_URL}/collect-data`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  } catch (e) {
    console.log("Error collectData: " + e);
  }
};
