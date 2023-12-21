import { useUnit } from "effector-react";
import { useLocalSearchParams } from "expo-router";

import { $selectedShoppingList } from "../state/shoppingList";
import ShoppingListItemScreen from "../screens/ShopingListItemScreen";

export default function Page() {
  const currentSelectedShoppingList = useUnit($selectedShoppingList);

  return <ShoppingListItemScreen list={currentSelectedShoppingList!} />;
}
