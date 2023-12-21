import { createEffect, createEvent, createStore } from "effector";
import { getReceipt, getRecipe, getSpoonReceipt } from "../../api/receipts";
import { Receipt } from "../../api/types";

export const $receipt = createStore<Receipt>({} as Receipt);
export const fxLoadReceipt = createEffect<{ id: string }, any>();
$receipt.on(fxLoadReceipt.doneData, (_, payload) => payload);

fxLoadReceipt.use(async ({ id }) => {
  const data = await getRecipe(id);
  return data;
});
