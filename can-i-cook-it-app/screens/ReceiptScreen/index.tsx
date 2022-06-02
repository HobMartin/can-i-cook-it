import { useStore } from "effector-react";
import { useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  useThemeColor,
  Button,
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
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { $user } from "../../state/user";
import {
  $favoritesReceipts,
  removeFromFavorites,
  updateFavoritesReceipt,
} from "../../state/favorites";

export default function ReceiptScreen({ route, navigation }: any) {
  const { receiptId } = route.params;
  const color = useThemeColor({}, "text");
  const currentUser = useStore($user);
  const receipt = useStore($receipt);
  const loading = useStore(fxLoadReceipt.pending);
  const favorites = useStore($favoritesReceipts);

  useEffect(() => {
    fxLoadReceipt({ id: receiptId });
  }, []);

  const sourceOpen = () => {
    openBrowserAsync(receipt.sourceUrl);
  };

  const icon: any = () => {
    return favorites.some((el: any) => el?.receipt === receiptId)
      ? "star"
      : "star-outline";
  };

  const onFavoriteClick = async () => {
    const currentDoc = favorites.find((f) => f.receipt === receiptId);

    if (icon() === "star" && currentDoc?.doc) {
      await deleteDoc(doc(db, "cities", currentDoc?.doc));
      removeFromFavorites(receiptId);
      return;
    }

    const docRef = await addDoc(
      collection(db, currentUser.email ?? currentUser.uid),
      {
        receiptId: receiptId,
        name: receipt.title,
        image: receipt.image,
      }
    );
    updateFavoritesReceipt({
      receipt: receiptId,
      doc: docRef.id,
      image: receipt.image,
      title: receipt.name,
    });
  };

  const handleCreateList = async () => {
    const docRef = doc(
      db,
      "ShoppingLists",
      `${currentUser.email ?? currentUser.uid}|${new Date().toISOString()}`
    );
    const list = receipt.extendedIngredients.map((ingredient: any) => ({
      name: capitalizeFirstLetter(ingredient.name),
      amount: `${ingredient.amount} ${ingredient.measures.metric.unitLong}`,
    }));

    setDoc(docRef, {
      id: new Date().toISOString(),
      list,
    }).then(() => {
      navigation.navigate("ShopsScreens");
    });
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
            <View style={receiptScreenStyles.favorite}>
              <TouchableOpacity onPress={onFavoriteClick}>
                <Ionicons name={icon()} size={32} color="white" />
              </TouchableOpacity>
            </View>
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
        <View style={receiptScreenStyles.listButtonCreate}>
          <Button
            onPress={handleCreateList}
            style={receiptScreenStyles.createListButton}
            text="Створити список покупок"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
