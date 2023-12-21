import { createEffect, createStore } from "effector";
import { Receipt } from "../../api/types";
import {
  getPopularRecipes,
  getUserRecommendations,
} from "../../api/predictPhoto";
import { supabase } from "../../initSupabase";

export const $recommendedRecipes = createStore<Receipt[]>([]);

export const fxLoadPopularRecipes = createEffect<void, Receipt[]>();

$recommendedRecipes.on(fxLoadPopularRecipes.doneData, (_, payload) => payload);

fxLoadPopularRecipes.use(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }
  console.log(user.id);

  const { data: rating } = await supabase
    .from("user")
    .select("rating_receipt(value)")
    .eq("auth_user", user.id)
    .single();

  if (!rating?.rating_receipt?.length) {
    const data = await getPopularRecipes();
    return data;
  }

  const data = await getUserRecommendations(user.id);

  return data;
});

$recommendedRecipes.on(fxLoadPopularRecipes.doneData, (_, payload) => payload);
