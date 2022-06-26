import { View, Text, useThemeColor } from "../Themed";
import React, { FC } from "react";
import { shoppingListItemStyles } from "./styles";

interface ShoppingListItemProps {
  name: string;
}

export const ShoppingListItem: FC<ShoppingListItemProps> = ({ name }) => {
  const color = useThemeColor({}, "tabIconSelected");
  return (
    <View
      style={{ ...shoppingListItemStyles.container, backgroundColor: color }}
    >
      <Text>{name}</Text>
    </View>
  );
};
