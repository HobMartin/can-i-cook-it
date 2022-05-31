import { createEffect, createEvent, createStore } from "effector";
import { getSpoonReceipt } from "../../api/receipts";

const updateReceipt = createEvent<any>();
export const $receipt = createStore<any>({});
$receipt.on(updateReceipt, (_, payload) => payload);
export const fxLoadReceipt = createEffect<{ id: string }, any>();

fxLoadReceipt.use(async (params) => {
  const result = await getSpoonReceipt(params.id);
  const receiptData = {
    id: result.id,
    title: result.title,
    image: result.image,
    readyInMinutes: result.readyInMinutes,
    calories: result.calories,
    sourceUrl: result.sourceUrl,
    extendedIngredients: result.extendedIngredients,
  };
  updateReceipt(receiptData);
});
