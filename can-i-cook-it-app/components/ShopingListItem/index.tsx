import { View, Text, useThemeColor } from "../Themed";
import React, { FC } from "react";
import { shoppingListItemStyles } from "./styles";

interface ShoppingListItemProps {
  name: string;
  isDone?: boolean;
}

export const ShoppingListItem: FC<ShoppingListItemProps> = ({
  name,
  isDone,
}) => {
  const color = useThemeColor({}, "buttonBackground");
  return (
    <View
      style={{
        ...shoppingListItemStyles.container,
        backgroundColor: isDone ? "#ccc" : color,
      }}
    >
      <Text>{name}</Text>
    </View>
  );
};
