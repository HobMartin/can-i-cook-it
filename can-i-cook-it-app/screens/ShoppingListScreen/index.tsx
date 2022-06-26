import { View, Text } from "../../components/Themed";
import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $user } from "../../state/user";
import { $shoppingList, fxLoadShoppingList } from "../../state/shoppingList";
import { shoppingListScreenStyles } from "./styles";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ShoppingList } from "./ShoppingList";

export default function ShoppingListScreen({ navigation }: any) {
  const currentUser = useStore($user);
  const shoppingList = useStore($shoppingList);

  useFocusEffect(() => {
    fxLoadShoppingList(currentUser);
  });

  const renderSubItem = ({ item }: any) => {
    return (
      <View style={shoppingListScreenStyles.subItem}>
        <Text style={shoppingListScreenStyles.subItemName}>{item.name}</Text>
        <Text style={shoppingListScreenStyles.subItemAmount}>
          {item.amount}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={shoppingListScreenStyles.listItem}>
        <FlatList
          data={item.list}
          horizontal={true}
          renderItem={renderSubItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <View style={shoppingListScreenStyles.container}>
      <Text style={shoppingListScreenStyles.pageTitle}>Список покупок</Text>
      <View style={shoppingListScreenStyles.listItemContainer}>
        {/* <FlatList
          data={shoppingList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        /> */}
        <ShoppingList navigation={navigation} />
      </View>
    </View>
  );
}
