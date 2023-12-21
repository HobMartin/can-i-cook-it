import { createEffect, createEvent, createStore } from "effector";
import { getRecipes, getSearchSpoonReceipts } from "../../api/receipts";
import { getReceiptParams } from "../../api/types";

export const $receipts = createStore<any[]>([]);
export const $hasMore = createStore<boolean>(false);
export const $page = createStore<number>(1);
export const fxLoadReceipts = createEffect<getReceiptParams, any>();
export const fxLoadMoreReceipts = createEffect<getReceiptParams, any>();

fxLoadReceipts.use(async ({ page, size, q, userId }) => {
  const data = await getRecipes(page, size, q, userId);

  const receiptData = data.data.map((receipt: any) => ({
    id: receipt.id.toString(),
    title: receipt.receipt_name,
    image: receipt.image,
  }));

  const hasMore = data.total ? data.total > data.page * data.size : false;
  return { receiptData, hasMore, page: data.page };
});

$receipts.on(fxLoadReceipts.doneData, (_, payload) => payload.receiptData);
$hasMore.on(fxLoadReceipts.doneData, (_, payload) => payload.hasMore);
$page.on(fxLoadReceipts.doneData, (_, payload) => payload.page);

fxLoadMoreReceipts.use(async ({ page, size }) => {
  console.log({ page });

  const data = await getRecipes(page, size);

  const receiptData = data.data.map((receipt) => ({
    id: receipt.id.toString(),
    title: receipt.receipt_name,
    image: receipt.image,
  }));

  console.log(data.total, data.page, data.size);
  const hasMore = data.total ? data.total > data.page * data.size : false;
  console.log({ hasMore });
  console.log(data.page);

  return {
    receiptData,
    hasMore: hasMore,
    page: data.page,
  };
});

$receipts.on(fxLoadMoreReceipts.doneData, (state, payload) => [
  ...state,
  ...payload.receiptData,
]);

$hasMore.on(fxLoadMoreReceipts.doneData, (_, payload) => payload.hasMore);
$page.on(fxLoadMoreReceipts.doneData, (_, payload) => payload.page);
