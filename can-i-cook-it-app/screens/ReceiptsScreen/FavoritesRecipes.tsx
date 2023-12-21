import React, { useCallback, useEffect, useState } from "react";
import { Text, View, TextInput } from "../../components/Themed";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { fxLoadReceipts } from "./model";
import { receiptScreenStyles } from "./styles";
import { ReceiptCard } from "../../components/ReceiptCard";
import { useDebounce } from "../../hooks/useDebounce";
import Colors from "../../constants/Colors";
import { Favorite_IL } from "../../assets/illustration";
import { $favoritesReceipts, fxGetFavorites } from "../../state/favorites";
import _ from "lodash";
import { storeRecentReceipts } from "./helper";
import { router, useFocusEffect } from "expo-router";
import { useUnit } from "effector-react";
import { openReceiptPage } from "../../utils/openReceiptPage";

export const FavoriteReceipts = () => {
  const favorites = useUnit($favoritesReceipts);
  const [search, setSearch] = useState("");
  const searchValue = useDebounce<string>(search, 500);

  const onReceiptClick = async (item: any) => {
    await storeRecentReceipts(item);
    openReceiptPage(item.receiptid);
  };

  const loadFavorites = useCallback(() => {
    fxGetFavorites(searchValue);
  }, []);

  useFocusEffect(loadFavorites);

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity activeOpacity={0} onPress={() => onReceiptClick(item)}>
        <ReceiptCard
          title={item?.name}
          image={item?.image}
          containerStyle={receiptScreenStyles.receiptContainer}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={receiptScreenStyles.scrollContainer}>
      <TextInput
        style={receiptScreenStyles.search}
        value={search}
        placeholderTextColor={Colors.dark.text}
        placeholder="Пошук"
        onChangeText={(value) => setSearch(value)}
      />
      {favorites.length ? (
        <FlatList
          style={receiptScreenStyles.receiptList}
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View>
          <Image
            source={Favorite_IL}
            style={{ height: 350, width: "100%", resizeMode: "cover" }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              color: "#ccc",
            }}
          >
            Додайте щось до улюблених
          </Text>
        </View>
      )}
    </View>
  );
};
