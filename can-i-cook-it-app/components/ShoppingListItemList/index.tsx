import { View, Text } from "../Themed";
import React, { FC, useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ListItem } from "./ListItem";
import {
  fxUpdateShoppingListItem,
  ShoppingListItem,
} from "../../state/shoppingList";
import { useDebounce } from "../../hooks/useDebounce";

interface ShoppingListItemListProps {
  id: string;
  list: Array<ShoppingListItem>;
}

export const ShoppingListItemList: FC<ShoppingListItemListProps> = ({
  id,
  list,
}) => {
  const [itemList, setList] = useState(list);

  const renderItem = ({ item }: any) => {
    const handleChecked = async (value: boolean) => {
      setList(
        itemList.map((el) =>
          el.name === item.name ? { ...el, done: value } : el
        )
      );
      await fxUpdateShoppingListItem({
        id,
        data: {
          item: {
            ...item,
            done: value,
          },
          // list: itemList.map((el) =>
          //   el.name === item.name ? { ...el, done: value } : el
          // ),
        },
      });
    };

    return (
      <View>
        <ListItem
          name={item.name}
          lightColor={item.done ? "#ccc" : undefined}
          darkColor={item.done ? "#ccc" : undefined}
          isChecked={item.done}
          onChange={handleChecked}
        />
      </View>
    );
  };

  return (
    <View style={style.container}>
      <FlatList
        data={itemList}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.name + index}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
});
