import { useStore } from "effector-react";
import { useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  useThemeColor,
} from "../../components/Themed";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { $receipt, fxLoadReceipt } from "./model";
import { receiptScreenStyles } from "./styles";
import Colors from "../../constants/Colors";
import { buildImageUrl, capitalizeFirstLetter } from "./helper";
import { Ionicons } from "@expo/vector-icons";
import { openBrowserAsync } from "expo-web-browser";
import { SameReceipt } from "../../components/SameReceipts";

export default function ReceiptScreen({ route, navigation }: any) {
  const { receiptId } = route.params;
  const color = useThemeColor({}, "text");
  const receipt = useStore($receipt);
  const loading = useStore(fxLoadReceipt.pending);

  useEffect(() => {
    fxLoadReceipt({ id: receiptId });
  }, []);

  const sourceOpen = () => {
    openBrowserAsync(receipt.sourceUrl);
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={receiptScreenStyles.ingredient}>
        <Image
          source={{ uri: buildImageUrl(item.image) }}
          style={{ height: 105, width: 105, borderRadius: 10 }}
        />
        <View style={receiptScreenStyles.ingredientInfo}>
          <Text style={receiptScreenStyles.ingredientTitle}>
            {capitalizeFirstLetter(item.name)}
          </Text>
          <Text style={receiptScreenStyles.ingredientText}>
            {item.original}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="small" color={Colors.dark.tint} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground
          resizeMode="cover"
          style={receiptScreenStyles.imageBackground}
          source={{ uri: receipt.image }}
        >
          <View style={receiptScreenStyles.container}>
            <Text style={receiptScreenStyles.title}>{receipt.title}</Text>
          </View>
        </ImageBackground>
        <View style={receiptScreenStyles.receiptInfo}>
          <View style={receiptScreenStyles.timeContainer}>
            <Ionicons
              style={{ marginRight: 10 }}
              name="time-outline"
              size={24}
              color={color}
            />
            <Text>{receipt.readyInMinutes} хвилин</Text>
          </View>
          <TouchableOpacity
            onPress={sourceOpen}
            style={receiptScreenStyles.urlSource}
          >
            <Text>Кроки</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={receipt.extendedIngredients}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id + index}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
