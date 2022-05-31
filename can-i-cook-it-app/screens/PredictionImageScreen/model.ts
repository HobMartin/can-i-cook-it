import { createEffect, createEvent, createStore } from "effector";
import { predictImage } from "../../api/predictPhoto";

const updatePredictionResult = createEvent<string>();

export const resetImage = createEvent();

export const $predictionResult = createStore<string>("");

$predictionResult.on(updatePredictionResult, (_, payload) => payload);

$predictionResult.reset(resetImage);

export const fxPredictFoodImage = createEffect<string, void>();

fxPredictFoodImage.use(async (params) => {
  const result = await predictImage(params);
  updatePredictionResult(result["food_name"]);
});
