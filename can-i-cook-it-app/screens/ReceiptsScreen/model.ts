import { createEffect, createEvent, createStore } from "effector";
import { getSearchSpoonReceipts } from "../../api/receipts";
import { getReceiptParams } from "../../api/types";

const updateReceipt = createEvent();
export const $receipts = createStore([]);
$receipts.on(updateReceipt, (_, payload) => payload);
export const fxLoadReceipts = createEffect<getReceiptParams, any>();

fxLoadReceipts.use(async (params) => {
  const result = await getSearchSpoonReceipts(params);

  const receiptData = result.results.map((receipt: any) => ({
    id: receipt.id.toString(),
    title: receipt.title,
    image: receipt.image,
  }));

  updateReceipt(receiptData);
  return receiptData;
});
