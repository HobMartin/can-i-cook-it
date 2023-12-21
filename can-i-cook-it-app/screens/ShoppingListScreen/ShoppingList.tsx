import { View } from "../../components/Themed";
import React, { useCallback } from "react";
import { useUnit } from "effector-react";
import {
  $shoppingList,
  ShoppingList as TShoppingList,
  fxLoadShoppingList,
  selectShoppingList,
} from "../../state/shoppingList";
import { FlatList, ListRenderItem, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ShoppingListItem } from "../../components/ShopingListItem";
import { router } from "expo-router";

export const ShoppingList = () => {
  const shoppingList = useUnit($shoppingList);

  const loadShoppingList = useCallback(() => {
    fxLoadShoppingList();
  }, []);

  useFocusEffect(loadShoppingList);

  const handleItemPress = (item: TShoppingList) => {
    selectShoppingList(item);
    router.push(`/list-view`);
  };

  const renderItem: ListRenderItem<TShoppingList> = ({ item }) => {
    return (
      <View style={{ width: "100%" }} key={item.id}>
        <Pressable onPress={() => handleItemPress(item)}>
          <ShoppingListItem
            name={item.name}
            isDone={item.list.every((el) => el.done)}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={shoppingList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
