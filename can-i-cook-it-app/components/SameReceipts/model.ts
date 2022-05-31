import { createEffect, createEvent, createStore } from "effector";
import { log } from "react-native-reanimated";
import { getSimilarSpoonReceipt } from "../../api/receipts";

const updateSameReceipts = createEvent();
export const $sameReceipts = createStore([]);

$sameReceipts.on(updateSameReceipts, (_, payload) => payload);
export const fxLoadSameReceipts = createEffect<string, void>();

fxLoadSameReceipts.use(async (params) => {
  const result = await getSimilarSpoonReceipt(params);
  updateSameReceipts(result);
});
