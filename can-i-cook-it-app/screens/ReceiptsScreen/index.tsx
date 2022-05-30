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

export default function ReceiptsScreen({ navigation }: any) {
  const receipts = useStore($receipts);
  const [search, setSearch] = useState("");
  const searchValue = useDebounce<string>(search, 500);
  console.log(receipts);

  useEffect(() => {
    fxLoadReceipts({ query: searchValue });
  }, [searchValue]);

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Receipt", { receiptId: item.id })}
      >
        <ReceiptCard title={item?.title} image={item?.image} />
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
      </SafeAreaView>
    </ScrollView>
  );
}
