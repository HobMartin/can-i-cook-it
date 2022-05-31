import { createEffect, createEvent, createStore } from "effector";
import { UserInfo } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

interface IFavorites {
  receipt: string;
  image: string;
  name: string;
  doc: string;
}

export const updateFavoritesReceipt = createEvent<IFavorites>();
export const removeFromFavorites = createEvent<string>();

export const $favoritesReceipts = createStore<IFavorites[]>([]);

export const fxGetFavorites = createEffect<UserInfo, void>();

$favoritesReceipts.on(updateFavoritesReceipt, (state, payload) => {
  if (state.some((el: any) => el.receipt === payload.receipt)) {
    return state;
  }
  return [...state, payload];
});

$favoritesReceipts.on(removeFromFavorites, (state, payload) => {
  return state.filter((f) => f.receipt !== payload);
});

fxGetFavorites.use(async (params) => {
  const querySnapshot = await getDocs(
    collection(db, params.email ?? params.uid)
  );
  querySnapshot.forEach((doc) => {
    updateFavoritesReceipt({
      receipt: doc.data().receiptId,
      image: doc.data().image,
      name: doc.data().name,
      doc: doc.id,
    });
  });
});
