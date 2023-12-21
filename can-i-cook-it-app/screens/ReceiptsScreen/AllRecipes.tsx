import { useUnit } from "effector-react";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View, TextInput } from "../../components/Themed";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  $hasMore,
  $page,
  $receipts,
  fxLoadMoreReceipts,
  fxLoadReceipts,
} from "./model";
import { receiptScreenStyles } from "./styles";
import { ReceiptCard } from "../../components/ReceiptCard";
import { useDebounce } from "../../hooks/useDebounce";
import Colors from "../../constants/Colors";
import { Search_IL } from "../../assets/illustration";
import _ from "lodash";
import { storeRecentReceipts } from "./helper";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { openReceiptPage } from "../../utils/openReceiptPage";

export const AllReceipts = () => {
  const { search: searchParam } = useLocalSearchParams<{ search: string }>();
  const receipts = useUnit($receipts);
  const isLoadingMoreRecipes = useUnit(fxLoadMoreReceipts.pending);
  const page = useUnit($page);
  const hasMore = useUnit($hasMore);
  const [search, setSearch] = useState(searchParam ?? "");
  const searchValue = useDebounce<string>(search, 500);

  const recipeSearchParam = useCallback(() => {
    if (searchParam) {
      setSearch(searchParam);
      router.setParams({ search: "" });
    }
  }, [searchParam]);

  useFocusEffect(recipeSearchParam);

  const loadRecipes = useCallback(() => {
    fxLoadReceipts({ q: searchValue, page });
  }, [searchValue]);

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
    console.log("onEndReached: ", { page });

    fxLoadMoreReceipts({ query: searchValue, page: page + 1 });
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
