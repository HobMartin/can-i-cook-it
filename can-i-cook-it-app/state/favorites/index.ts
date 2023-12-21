import { createEffect, createEvent, createStore } from "effector";
import { UserInfo } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { supabase } from "../../initSupabase";

interface IFavorites {
  image: string | null;
  name: string | null;
  receiptid: string | null;
  user_id: string | null;
  uuid: string;
}

export const updateFavoritesReceipt = createEvent<IFavorites>();
export const removeFromFavorites = createEvent<string>();

export const $favoritesReceipts = createStore<IFavorites[]>([]);

export const fxGetFavorites = createEffect<string, IFavorites[]>();
export const fxAddToFavorites = createEffect<
  { image: string; name: string; receiptid: string },
  IFavorites | null
>();
export const fxRemoveFromFavorites = createEffect<string, string>();

fxGetFavorites.use(async (params) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return [];
  }
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .ilike("name", `%${params}%`)
    .limit(10);
  if (error) {
    console.log(error);
    return [];
  }
  return data;
});
$favoritesReceipts.on(fxGetFavorites.doneData, (_, payload) => payload);

fxAddToFavorites.use(async (params) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("favorites")
    .insert([
      {
        ...params,
        user_id: user.id,
      },
    ])
    .select("*")
    .single();
  if (error) {
    console.log(error);
    return null;
  }
  return data;
});

$favoritesReceipts.on(fxAddToFavorites.doneData, (state, payload) => {
  if (payload) {
    return [...state, payload];
  }
  return state;
});

fxRemoveFromFavorites.use(async (params) => {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .match({ uuid: params });
  if (error) {
    console.log(error);
  }
  return params;
});

$favoritesReceipts.on(fxRemoveFromFavorites.doneData, (state, payload) => {
  return state.filter((f) => f.uuid !== payload);
});
