import { createEffect, createEvent, createStore } from "effector";
import { UserInfo } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const updateShoppingList = createEvent<any>();

export const $shoppingList = createStore<any>([]);

$shoppingList.on(updateShoppingList, (state, payload) => {
  if (state.some((el: any) => el.id === payload.id)) {
    return state;
  }
  return [...state, payload];
});

export const fxLoadShoppingList = createEffect<UserInfo, void>();

fxLoadShoppingList.use(async (params) => {
  const querySnapshot = await getDocs(collection(db, "ShoppingLists"));
  querySnapshot.forEach((doc) => {
    if (doc.id.split("|")[0] === (params.email ?? params.uid)) {
      updateShoppingList({
        id: doc.data().id,
        list: doc.data().list,
        name: doc.data().name,
      });
    }
  });
});
