import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";
import { useStore, useStoreMap } from "effector-react";
import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Cook_IL } from "../../assets/illustration";
import { ReceiptCard } from "../../components/ReceiptCard";
import { ShoppingListItem } from "../../components/ShopingListItem";
import { Text, SafeAreaView, View } from "../../components/Themed";
import {
  $shoppingList,
  $todayShoppingList,
  fxLoadShoppingList,
} from "../../state/shoppingList";
import { $user } from "../../state/user";
import { receiptScreenStyles } from "../ReceiptScreen/styles";
import { homeScreenStyles } from "./styles";

export default function HomeScreen({ navigation }: any) {
  const [recentReceipt, setRecentReceipt] = useState([]);
  const currentUser = useStore($user);

  const todayList = useStore($todayShoppingList);
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => onReceiptClick(item)}>
        <ReceiptCard title={item?.title} image={item?.image} />
      </TouchableOpacity>
    );
  };

  const handleItemPress = (item: any) => {
    navigation.navigate("ShoppingList", { item });
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
    AsyncStorage.getItem("recentReceipt").then((recent) => {
      recent !== null && setRecentReceipt(JSON.parse(recent));
    });
  }, []);
  useFocusEffect(() => {
    fxLoadShoppingList(currentUser);
  });

  const onReceiptClick = async (item: any) => {
    navigation.navigate("Receipt", { receiptId: item.id ?? item.receipt });
  };
  return (
    <SafeAreaView style={homeScreenStyles.container}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Останні відвідані рецепти
      </Text>
      <FlatList
        style={receiptScreenStyles.receiptList}
        horizontal={true}
        data={recentReceipt}
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
    </SafeAreaView>
  );
}
