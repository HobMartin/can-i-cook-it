import { useLocalSearchParams } from "expo-router";
import ReceiptScreen from "../screens/ReceiptScreen";

export default function Page() {
  const { receiptId } = useLocalSearchParams<{ receiptId: string }>();
  console.log(receiptId);

  return <ReceiptScreen receiptId={receiptId!} />;
}
