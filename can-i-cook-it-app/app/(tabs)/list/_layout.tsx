import { useUnit } from "effector-react";
import { Stack } from "expo-router";
import { $selectedShoppingList } from "../../../state/shoppingList";

export default function ListLayout() {
  const currentSelectedShoppingList = useUnit($selectedShoppingList);
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{ title: "Список покупок", headerShown: false }}
      />
      <Stack.Screen name="dateTimeModal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
