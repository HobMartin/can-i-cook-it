import { View, Text } from "../../components/Themed";
import React from "react";
import { shoppingListScreenStyles } from "./styles";

import { ShoppingList } from "./ShoppingList";

export default function ShoppingListScreen({ navigation }: any) {
  return (
    <View style={shoppingListScreenStyles.container}>
      <Text style={shoppingListScreenStyles.pageTitle}>Список покупок</Text>
      <View style={shoppingListScreenStyles.listItemContainer}>
        <ShoppingList navigation={navigation} />
      </View>
    </View>
  );
}
