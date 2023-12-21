import { useUnit } from "effector-react";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View, TextInput } from "../../components/Themed";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { receiptScreenStyles } from "./styles";
import { ReceiptCard } from "../../components/ReceiptCard";
import { useDebounce } from "../../hooks/useDebounce";
import Colors from "../../constants/Colors";
import { Search_IL } from "../../assets/illustration";
import _ from "lodash";
import { storeRecentReceipts } from "./helper";
import { useFocusEffect } from "expo-router";
import { openReceiptPage } from "../../utils/openReceiptPage";
import { $user } from "../../state/user";
import {
  $hasMoreOwnReceipts,
  $ownReceiptPage,
  $ownReceipts,
  fxLoadMoreOwnReceipts,
  fxLoadOwnReceipts,
} from "./ownReceiptModel";

export const OwnReceipts = () => {
  const receipts = useUnit($ownReceipts);
  const isLoadingMoreRecipes = useUnit(fxLoadMoreOwnReceipts.pending);
  const page = useUnit($ownReceiptPage);
  const user = useUnit($user);
  const hasMore = useUnit($hasMoreOwnReceipts);
  const [search, setSearch] = useState("");
  const searchValue = useDebounce<string>(search, 500);

  const loadRecipes = useCallback(() => {
    fxLoadOwnReceipts({ q: searchValue, page, userId: user?.id });
  }, []);

  useFocusEffect(loadRecipes);

  const onReceiptClick = async (item: any) => {
    await storeRecentReceipts(item);
    openReceiptPage(item.id ?? item.receipt);
  };

  const renderItem = ({ item }: any) => {
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

  const renderFooter = () => {
    return (
      <View style={{ height: 50 }}>
        {!hasMore && (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              color: "#ccc",
            }}
          >
            Більше рецептів немає
          </Text>
        )}
        {isLoadingMoreRecipes && (
          <ActivityIndicator size="small" color={Colors.dark.tint} />
        )}
      </View>
    );
  };

  const onEndReached = () => {
    if (!hasMore) return;

    fxLoadMoreOwnReceipts({ query: searchValue, page: page + 1 });
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
      {receipts.length <= 0 ? (
        <View>
          <Image
            source={Search_IL}
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
            Почніть пошук
          </Text>
        </View>
      ) : (
        <FlatList
          style={receiptScreenStyles.receiptList}
          contentContainerStyle={{ flexGrow: 1 }}
          data={receipts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
        />
      )}
    </View>
  );
};
