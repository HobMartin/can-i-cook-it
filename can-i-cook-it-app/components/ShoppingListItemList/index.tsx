import { View, Text } from "../Themed";
import React, { FC } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ListItem } from "./ListItem";

interface ShoppingListItemListProps {
  list: Array<any>;
}

export const ShoppingListItemList: FC<ShoppingListItemListProps> = ({
  list,
}) => {
  const renderItem = ({ item }: any) => {
    return (
      <View>
        {/* <Text>{item.name}</Text> */}
        <ListItem name={item.name} />
      </View>
    );
  };
  return (
    <View style={style.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
