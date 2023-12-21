import { createEffect, createEvent, createStore } from "effector";
import { getRecipes, getSearchSpoonReceipts } from "../../api/receipts";
import { getReceiptParams } from "../../api/types";

export const $ownReceipts = createStore<any[]>([]);

export const $hasMoreOwnReceipts = createStore<boolean>(false);
export const $ownReceiptPage = createStore<number>(1);
export const fxLoadOwnReceipts = createEffect<getReceiptParams, any>();

export const fxLoadMoreOwnReceipts = createEffect<getReceiptParams, any>();

fxLoadOwnReceipts.use(async ({ page, size, q, userId }) => {
  console.log(userId);

  const data = await getRecipes(page, size, q, userId);

  const receiptData = data.data.map((receipt: any) => ({
    id: receipt.id.toString(),
    title: receipt.receipt_name,
    image: receipt.image,
  }));

  const hasMore = data.total > data.page * data.size;
  return { receiptData, hasMore, page: data.page };
});

$ownReceipts.on(
  fxLoadOwnReceipts.doneData,
  (_, payload) => payload.receiptData
);
$hasMoreOwnReceipts.on(
  fxLoadOwnReceipts.doneData,
  (_, payload) => payload.hasMore
);
$ownReceiptPage.on(fxLoadOwnReceipts.doneData, (_, payload) => payload.page);

fxLoadMoreOwnReceipts.use(async ({ page, size }) => {
  const data = await getRecipes(page, size);

  const receiptData = data.data.map((receipt) => ({
    id: receipt.id.toString(),
    title: receipt.receipt_name,
    image: receipt.image,
  }));

  console.log(data.total, data.page, data.size);
  const hasMore = data.total > data.page * data.size;

  return {
    receiptData,
    hasMore: hasMore,
    page: data.page,
  };
});

$ownReceipts.on(fxLoadMoreOwnReceipts.doneData, (state, payload) => [
  ...state,
  ...payload.receiptData,
]);

$hasMoreOwnReceipts.on(
  fxLoadMoreOwnReceipts.doneData,
  (_, payload) => payload.hasMore
);
$ownReceiptPage.on(
  fxLoadMoreOwnReceipts.doneData,
  (_, payload) => payload.page
);
