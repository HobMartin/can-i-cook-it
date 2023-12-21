import dayjs, { Dayjs } from "dayjs";
import { createEffect, createEvent, createStore, restore } from "effector";
import { User } from "@supabase/supabase-js";
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
import { supabase } from "../../initSupabase";
import { capitalizeFirstLetter } from "../../screens/ReceiptScreen/helper";
import { Database } from "../../types/database.types";
import { Receipt } from "../../api/types";

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

export const selectShoppingList = createEvent<ShoppingList>();

export const $selectedShoppingList = restore<ShoppingList | null>(
  selectShoppingList,
  null
);

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

export const fxLoadShoppingList = createEffect<void, ShoppingList[]>();
export const fxDeleteShoppingList = createEffect<string, ShoppingList[]>();

export const fxUpdateShoppingListItem = createEffect<
  { id: string; data: any },
  ShoppingList[] | null
>();

$shoppingList.on(fxUpdateShoppingListItem.doneData, (state, payload) => {
  if (!payload) {
    return state;
  }
  // console.log(payload);

  return payload;
});

fxDeleteShoppingList.use(async (id) => {
  const { error } = await supabase
    .from("shopping_list")
    .delete()
    .eq("uuid", id);

  if (error) {
    console.error(error);
    throw error;
  }

  const { data: shopList, error: shopListError } = await supabase
    .from("shopping_list")
    .select("*,shopping_list_item(*)");

  if (shopListError) {
    console.error(shopListError);
    throw error;
  }

  const list: ShoppingList[] = shopList.map((el: any) => {
    return {
      id: el.uuid,
      name: el.name,
      list: el.shopping_list_item.map((el: any) => ({
        id: el.uuid,
        name: el.name,
        amount: el.amount,
        done: el.done,
      })),
      notify: el.notify,
    };
  });

  return list;
});

$shoppingList.on(fxDeleteShoppingList.doneData, (_, payload) => payload);

fxUpdateShoppingListItem.use(async (params) => {
  // console.log(params);

  if (params.data.item) {
    const updateItem = {
      name: params.data.item.name,
      amount: params.data.item.amount,
      done: params.data.item.done,
    };

    const { data, error } = await supabase
      .from("shopping_list_item")
      .update({
        done: updateItem.done,
      })
      .eq("uuid", params.data.item.id)
      .select("*")
      .single();
    if (error) {
      console.error(error);
      return null;
    }
    console.log(data);

    const { data: shopList, error: shopListError } = await supabase
      .from("shopping_list")
      .select("*,shopping_list_item(*)");

    if (shopListError) {
      console.error(shopListError);
      return null;
    }

    const list: ShoppingList[] = shopList.map((el: any) => {
      return {
        id: el.uuid,
        name: el.name,
        list: el.shopping_list_item.map((el: any) => ({
          id: el.uuid,
          name: el.name,
          amount: el.amount,
          done: el.done,
        })),
        notify: el.notify,
      };
    });

    return list;
  }

  const { data, error } = await supabase
    .from("shopping_list")
    .update(params.data)
    .eq("uuid", params.id)
    .select("*,shopping_list_item(*)");
  // const docRef = doc(db, "ShoppingLists", params.id);
  if (error) {
    console.error(error);
    return null;
  }
  const list: ShoppingList[] = data.map((el: any) => {
    return {
      id: el.uuid,
      name: el.name,
      list: el.shopping_list_item.map((el: any) => ({
        id: el.uuid,
        name: el.name,
        amount: el.amount,
        done: el.done,
      })),
      notify: el.notify,
    };
  });
  return list;
  // await updateDoc(docRef, params.data);
});

fxLoadShoppingList.use(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }
  const { data, error } = await supabase
    .from("shopping_list")
    .select("*, shopping_list_item(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }
  const list: ShoppingList[] = data.map((el: any) => {
    return {
      id: el.uuid,
      name: el.name,
      list: el.shopping_list_item.map((el: any) => ({
        id: el.uuid,
        name: el.name,
        amount: el.amount,
        done: el.done,
      })),
      notify: el.notify,
    };
  });

  return list;
});

$shoppingList.on(fxLoadShoppingList.doneData, (_, payload) => payload);

export const fxCreateShoppingList = createEffect<
  { user: User; receipt: Receipt },
  ShoppingList | null
>();

fxCreateShoppingList.use(async ({ receipt }) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  const notify = dayjs()
    .add(1, "day")
    .set("hour", 13)
    .set("minute", 0)
    .set("second", 0)
    .toISOString();

  const { data, error } = await supabase
    .from("shopping_list")
    .insert({ user_id: user.id, name: receipt.receipt_name, notify })
    .select("*")
    .single();

  if (error) {
    console.error(error);

    return null;
  }

  const { error: shoppingListItemError } = await supabase
    .from("shopping_list_item")
    .insert(
      receipt.ingredient.map((ingredient) => ({
        name: ingredient.name,
        amount: ``,
        done: false,
        shopping_list_id: data.uuid,
      }))
    )
    .select("uuid");
  if (shoppingListItemError) {
    console.error(shoppingListItemError);
    return null;
  }

  const { data: shoppingList, error: shoppingListError } = await supabase
    .from("shopping_list")
    .select("*, shopping_list_item(*)")
    .eq("uuid", data.uuid)
    .single();

  if (shoppingListError) {
    console.error(shoppingListError);

    return null;
  }
  const list: ShoppingList = {
    id: shoppingList.uuid,
    name: shoppingList.name,
    list: shoppingList.shopping_list_item.map((el: any) => ({
      id: el.uuid,
      name: el.name,
      amount: el.amount,
      done: el.done,
    })),
    notify: shoppingList.notify ?? "",
  };

  return list;
});

$shoppingList.on(fxCreateShoppingList.doneData, (state, payload) => {
  if (!payload) {
    return state;
  }
  return [...state, payload];
});
