import { createEffect, createEvent, createStore } from "effector";
import { getSpoonReceipt } from "../../api/receipts";
import { t } from "../../hooks/useTranslate";

export const $receipt = createStore<any>({});
export const fxLoadReceipt = createEffect<{ id: string }, any>();
$receipt.on(fxLoadReceipt.doneData, (_, payload) => payload);

fxLoadReceipt.use(async (params) => {
  const result = await getSpoonReceipt(params.id);

  const extendedIngredients = await Promise.all(
    result.extendedIngredients.map(async (el: any) => {
      console.log(el);
      return {
        id: el.id,
        name: await t(el.name),
        amount: el.amount,
        image: el.image,
        unit: await t(el.measures?.metric?.unitLong),
        text: await t(el.original),
      };
    })
  );
  const receiptData = {
    id: result.id,
    title: await t(result.title),
    image: result.image,
    readyInMinutes: result.readyInMinutes,
    calories: result.calories,
    sourceUrl: result.sourceUrl,
    extendedIngredients: extendedIngredients,
  };
  return receiptData;
});
