import { useStore } from "effector-react";
import { useEffect } from "react";
import { Text, View, SafeAreaView } from "../../components/Themed";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { $receipt, fxLoadReceipt } from "./model";
import { receiptScreenStyles } from "./styles";
import Colors from "../../constants/Colors";
import { buildImageUrl, capitalizeFirstLetter } from "./helper";

export default function ReceiptScreen({ route, navigation }: any) {
  const { receiptId } = route.params;
  const receipt = useStore($receipt);
  const loading = useStore(fxLoadReceipt.pending);

  useEffect(() => {
    fxLoadReceipt({ id: receiptId });
  }, []);

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
      <ImageBackground
        resizeMode="cover"
        style={receiptScreenStyles.imageBackground}
        source={{ uri: receipt.image }}
      >
        <View style={receiptScreenStyles.container}>
          <Text style={receiptScreenStyles.title}>{receipt.title}</Text>
        </View>
      </ImageBackground>
      <View>
        <Text>{receipt.readyInMinutes} хвилин</Text>
      </View>
      <FlatList
        data={receipt.extendedIngredients}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index}
      />
    </SafeAreaView>
  );
}
