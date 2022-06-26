import dayjs, { Dayjs } from "dayjs";
import { createEffect, createEvent, createStore } from "effector";
import { UserInfo } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export interface ShoppingListItem {
  name: string;
  amount: string;
  done: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  list: ShoppingListItem[];
  notify: string;
}

export const updateShoppingList = createEvent<ShoppingList>();

export const $shoppingList = createStore<ShoppingList[]>([]);

export const $todayShoppingList = $shoppingList.map((el) =>
  el.filter((el) =>
    dayjs(dayjs(el.notify).format("YYYY-MM-DD")).isSame(
      dayjs(dayjs().format("YYYY-MM-DD"))
    )
  )
);

$shoppingList.on(updateShoppingList, (state, payload) => {
  if (state.some((el: any) => el.id === payload.id)) {
    return state;
  }
  return [...state, payload];
});

export const fxLoadShoppingList = createEffect<UserInfo, ShoppingList[]>();

export const fxUpdateShoppingListItem = createEffect<
  { id: string; data: any },
  void
>();

fxUpdateShoppingListItem.use(async (params) => {
  const docRef = doc(db, "ShoppingLists", params.id);

  await updateDoc(docRef, params.data);
});

fxLoadShoppingList.use(async (params) => {
  const q = query(
    collection(db, "ShoppingLists"),
    where("userId", "==", params.uid)
  );
  const querySnapshot = await getDocs(q);
  const list: ShoppingList[] = [];
  querySnapshot.forEach((doc) => {
    list.push({
      id: doc.id,
      list: doc.data().list,
      name: doc.data().name,
      notify: dayjs.unix(doc.data().notify.seconds).toISOString(),
    });
  });

  return list;
});

$shoppingList.on(fxLoadShoppingList.doneData, (_, payload) => payload);
