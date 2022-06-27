import { createEffect, createEvent, createStore } from "effector";
import { predictImage } from "../../api/predictPhoto";
import { t } from "../../hooks/useTranslate";

interface PredictionResult {
  food_name: string;
  model_score: number;
}

const updatePredictionResult = createEvent<string>();

export const resetImage = createEvent();

export const $predictionResult = createStore<PredictionResult>(
  {} as PredictionResult
);

$predictionResult.reset(resetImage);

export const fxPredictFoodImage = createEffect<string, PredictionResult>();

fxPredictFoodImage.use(async (params) => {
  const result = await predictImage(params);
  const name = await t(result.food_name);
  return { ...result, food_name: name };
});

$predictionResult.on(fxPredictFoodImage.doneData, (_, payload) => payload);
