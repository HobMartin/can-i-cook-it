import { createEffect, createEvent, createStore } from "effector";
import { predictImage } from "../../api/predictPhoto";
import { supabase } from "../../initSupabase";

interface PredictionResult {
  food_name: string;
  model_score: number;
}

const updatePredictionResult = createEvent<string>();

export const resetImage = createEvent();

export const $predictionResult = createStore<PredictionResult>({} as any);

$predictionResult.reset(resetImage);

export const fxPredictFoodImage = createEffect<string, PredictionResult>();
const fxSavePredictionResult = createEffect<
  { image: string; name: string },
  void
>();

fxSavePredictionResult.use(async (params) => {
  const { image, name } = params;

  const { error } = await supabase.from("prediction_image").insert({
    image,
    name,
  });

  if (error) {
    throw error;
  }
});

fxPredictFoodImage.use(async (params) => {
  const result = await predictImage(params);

  return {
    food_name: result.prediction,
    model_score: result.score,
  };
});

$predictionResult.on(fxPredictFoodImage.doneData, (_, payload) => payload);
