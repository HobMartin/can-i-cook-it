import { View, Text } from "../Themed";
import React, { useEffect } from "react";
import { useUnit } from "effector-react";
import { $sameReceipts, fxLoadSameReceipts } from "./model";

interface SameReceiptProps {
  id: string;
}

export const SameReceipt = ({ id }: SameReceiptProps) => {
  const similarReceipts = useUnit($sameReceipts);

  useEffect(() => {
    fxLoadSameReceipts(id);
  }, []);

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};
