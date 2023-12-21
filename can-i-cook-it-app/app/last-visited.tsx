import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";

import { ReceiptCard } from "../components/ReceiptCard";
import { receiptScreenStyles } from "../screens/ReceiptsScreen/styles";
import { openReceiptPage } from "../utils/openReceiptPage";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

export default function ModalScreen() {
  const [recentReceipt, setRecentReceipt] = useState([]);
  const onReceiptClick = async (item: any) => {
    openReceiptPage(item.receiptid);
  };

  const loadRecentReceipts = useCallback(() => {
    AsyncStorage.getItem("recentReceipt").then((recent) => {
      recent !== null && setRecentReceipt(JSON.parse(recent));
    });
  }, []);

  useFocusEffect(loadRecentReceipts);

  const renderItem = ({ item }: any) => {
    console.log(item);

    return (
      <TouchableOpacity activeOpacity={0} onPress={() => onReceiptClick(item)}>
        <ReceiptCard
          title={item?.title}
          image={item?.image}
          containerStyle={receiptScreenStyles.receiptContainer}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={receiptScreenStyles.scrollContainer}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Останні відвідані рецепти
      </Text>
      <FlatList
        style={receiptScreenStyles.receiptList}
        data={recentReceipt}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
