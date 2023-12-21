import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { useUnit } from "effector-react";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ReceiptCard } from "../../components/ReceiptCard";
import { ShoppingListItem } from "../../components/ShopingListItem";
import { Text, SafeAreaView, View } from "../../components/Themed";
import {
  $shoppingList,
  $todayShoppingList,
  fxLoadShoppingList,
  selectShoppingList,
} from "../../state/shoppingList";
import { $user } from "../../state/user";
import { receiptScreenStyles } from "../ReceiptScreen/styles";
import { homeScreenStyles } from "./styles";
import { router } from "expo-router";
import { openReceiptPage } from "../../utils/openReceiptPage";
import {
  $recommendedRecipes,
  fxLoadPopularRecipes,
} from "../../state/recommendation";

export default function HomeScreen({ navigation }: any) {
  const [recentReceipt, setRecentReceipt] = useState([]);
  const currentUser = useUnit($user);
  const popularReceipts = useUnit($recommendedRecipes);

  const todayList = useUnit($todayShoppingList);
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => onReceiptClick(item)}>
        <ReceiptCard title={item?.receipt_name} image={item?.image} />
      </TouchableOpacity>
    );
  };

  const handleItemPress = (item: any) => {
    selectShoppingList(item);
    router.push(`/list/${item.id}`);
  };

  const renderListItem = ({ item }: any) => {
    return (
      <View style={{ width: "90%", marginHorizontal: 20 }}>
        <TouchableOpacity onPress={() => handleItemPress(item)}>
          <ShoppingListItem
            name={item.name}
            isDone={item.list.every((el: any) => el.done)}
          />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    fxLoadPopularRecipes();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fxLoadShoppingList();
    }, [])
  );

  const onReceiptClick = async (item: any) => {
    openReceiptPage(item.id ?? item.receipt);
  };
  return (
    <View style={homeScreenStyles.container}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Рекомендовані рецепти
      </Text>
      <FlatList
        style={receiptScreenStyles.receiptList}
        horizontal={true}
        data={popularReceipts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Що сьогодні потрібно купити
      </Text>
      <View style={{ height: 350, width: "100%" }}>
        <FlatList
          data={todayList}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
