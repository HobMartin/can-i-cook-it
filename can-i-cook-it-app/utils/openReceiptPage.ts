import { router } from "expo-router";

export function openReceiptPage(receiptId: string) {
  router.push({
    pathname: "/receipt-view",
    params: {
      receiptId,
    },
  });
}
