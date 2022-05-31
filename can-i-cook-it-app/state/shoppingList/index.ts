import { createEvent, createStore } from "effector";

export const updateShoppingList = createEvent<any>();

export const $shoppingList = createStore<any>([]);
