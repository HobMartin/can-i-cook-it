import { useStore } from "effector-react";
import { useEffect, useState } from "react";
import { Text, SafeAreaView, View, TextInput } from "../../components/Themed";
import {
  FlatList,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { $receipts, fxLoadReceipts } from "./model";
import { receiptScreenStyles } from "./styles";
import { ReceiptCard } from "../../components/ReceiptCard";
import { useDebounce } from "../../hooks/useDebounce";
import Colors from "../../constants/Colors";
import { Favorite_IL, Search_IL } from "../../assets/illustration";
import { $favoritesReceipts, fxGetFavorites } from "../../state/favorites";
import { $user } from "../../state/user";

export default function ReceiptsScreen({ route, navigation }: any) {
  const name = route?.params?.name;
  const receipts = useStore($receipts);
  const currentUser = useStore($user);
  const [search, setSearch] = useState(name ?? "");
  const searchValue = useDebounce<string>(search, 500);
  const favorites = useStore($favoritesReceipts);

  useEffect(() => {
    fxLoadReceipts({ query: searchValue });
    if (name) {
      setSearch(name);
    }
    fxGetFavorites(currentUser);
  }, [searchValue, name]);

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Receipt", { receiptId: item.id ?? item.receipt })
        }
      >
        <ReceiptCard title={item?.title ?? item?.name} image={item?.image} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={receiptScreenStyles.container}>
        <Text style={receiptScreenStyles.title}>Рецепти</Text>
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
            horizontal={true}
            data={receipts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        <View style={receiptScreenStyles.favoriteContainer}>
          <Text style={receiptScreenStyles.title}>Улюблені рецепти</Text>
          {favorites.length ? (
            <FlatList
              style={receiptScreenStyles.receiptList}
              horizontal={true}
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
      </SafeAreaView>
    </ScrollView>
  );
}
