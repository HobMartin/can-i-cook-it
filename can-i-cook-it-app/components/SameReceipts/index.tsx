import { View, Text } from "../Themed";
import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $sameReceipts, fxLoadSameReceipts } from "./model";

interface SameReceiptProps {
  id: string;
}

export const SameReceipt = ({ id }: SameReceiptProps) => {
  const similarReceipts = useStore($sameReceipts);

  useEffect(() => {
    fxLoadSameReceipts(id);
  }, []);

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};
