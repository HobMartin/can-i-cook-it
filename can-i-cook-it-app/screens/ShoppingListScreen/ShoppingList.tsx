import { View, Text } from "../../components/Themed";
import React, { FC } from "react";
import { useStore } from "effector-react";
import { $user } from "../../state/user";
import { $shoppingList, fxLoadShoppingList } from "../../state/shoppingList";
import { FlatList, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ShoppingListItem } from "../../components/ShopingListItem";

interface ShoppingListProps {
  navigation: any;
}

export const ShoppingList: FC<ShoppingListProps> = ({ navigation }) => {
  const currentUser = useStore($user);
  const shoppingList = useStore($shoppingList);

  useFocusEffect(() => {
    fxLoadShoppingList(currentUser);
  });

  const handleItemPress = (item: any) => {
    navigation.navigate("ShoppingList", { item });
  };

  const renderItem = ({ item }: any) => {
    return (
      <View>
        <TouchableOpacity onPress={() => handleItemPress(item)}>
          <ShoppingListItem name={item.name} />
        </TouchableOpacity>
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
