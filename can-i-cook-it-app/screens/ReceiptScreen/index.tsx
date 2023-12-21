import { useUnit } from "effector-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View, useThemeColor, Button } from "../../components/Themed";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { $receipt, fxLoadReceipt } from "./model";
import { receiptScreenStyles } from "./styles";
import { receiptScreenStyles as receiptsScreenStyles } from "../ReceiptsScreen/styles";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { $user } from "../../state/user";
import {
  $favoritesReceipts,
  fxAddToFavorites,
  fxRemoveFromFavorites,
} from "../../state/favorites";
import { StatusBar } from "expo-status-bar";
import { router, useFocusEffect } from "expo-router";
import {
  fxCreateShoppingList,
  selectShoppingList,
} from "../../state/shoppingList";
import { Ingredients } from "./Ingradients";
import { Steps } from "./Steps";
import { Rating } from "../../components/Rating";
import { getTimeToCook } from "../../components/TimeToCook/utils";
import { $rating, fxGetRating, fxRating } from "../../state/rating";
import { getAVGRating } from "../../utils/getAVGRating";
import { getRecipeRecommendations } from "../../api/predictPhoto";
import { Avatar } from "react-native-rapi-ui";
import { ReceiptCard } from "../../components/ReceiptCard";
import { openReceiptPage } from "../../utils/openReceiptPage";

type Props = {
  receiptId: string;
};

export default function ReceiptScreen({ receiptId }: Props) {
  const color = useThemeColor({}, "text");
  const currentUser = useUnit($user);
  const receipt = useUnit($receipt);
  const loading = useUnit(fxLoadReceipt.pending);
  const favorites = useUnit($favoritesReceipts);
  const rating = useUnit($rating);
  // const recommendation = useUnit($recommendedRecipes);
  const [recommendation, setRecommendation] = useState<any>([]);
  console.log({ rating });

  const loadRecipe = useCallback(() => {
    console.log(receiptId);

    fxLoadReceipt({ id: receiptId });
    fxGetRating({ receiptId }).then(async (data) => {
      if (data) {
        const data = await getRecipeRecommendations(currentUser.id, receiptId);

        console.log(data);

        setRecommendation(data);
      }
    });
  }, [receiptId]);

  useFocusEffect(loadRecipe);

  const icon: any = useMemo(() => {
    return favorites.some((el) => el.receiptid === receiptId)
      ? "heart"
      : "heart-outline";
  }, [favorites]);

  const avgRating = useMemo(() => {
    return getAVGRating(receipt.rating_receipt);
  }, [receipt.rating_receipt]);

  const ratingIcon: any = useMemo(() => {
    if (avgRating > 4) return "star";
    if (avgRating > 3) return "star-half";
    return "star-outline";
  }, [avgRating]);

  const onFavoriteClick = async () => {
    const currentFav = favorites.find((f) => f.receiptid === receiptId);

    if (icon === "heart" && currentFav?.receiptid) {
      await fxRemoveFromFavorites(currentFav.uuid);
      return;
    }

    await fxAddToFavorites({
      image: receipt.image,
      name: receipt.receipt_name,
      receiptid: receiptId,
    });
  };

  const handleCreateList = async () => {
    const list = await fxCreateShoppingList({
      user: currentUser,
      receipt,
    });
    console.log(list);

    if (!list) return;

    selectShoppingList(list);
    router.push(`/list`);
  };

  const handleRating = async (value: number) => {
    console.log(receipt.rating_receipt);
    await fxRating({ receiptId, value });
    const data = await getRecipeRecommendations(currentUser.id, receiptId);

    console.log(data);

    setRecommendation(data);
  };
  const timeToCookText = useMemo(
    () => getTimeToCook(+receipt.time_to_cook).text,
    [receipt.time_to_cook]
  );

  const renderItem = ({ item }: any) => {
    console.log(item);

    return (
      <TouchableOpacity
        activeOpacity={0}
        onPress={() => {
          openReceiptPage(item.receiptid);
        }}
      >
        <ReceiptCard
          title={item?.receipt_name}
          image={item?.image}
          containerStyle={[
            receiptsScreenStyles.receiptContainer,
            { width: 300 },
          ]}
        />
      </TouchableOpacity>
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
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground
          resizeMode="cover"
          style={receiptScreenStyles.imageBackground}
          source={{ uri: receipt.image }}
        >
          <View style={receiptScreenStyles.container}>
            <View style={receiptScreenStyles.titleContainer}>
              <Text style={receiptScreenStyles.title}>
                {receipt.receipt_name}
              </Text>
            </View>
            <View style={receiptScreenStyles.favorite}>
              <TouchableOpacity onPress={onFavoriteClick}>
                <Ionicons name={icon} size={32} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={receiptScreenStyles.rating}>
          <Avatar
            size="md"
            source={{
              uri:
                currentUser.user_metadata?.avatar_url ??
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            {currentUser.user_metadata?.full_name}
          </Text>
        </View>
        <View style={receiptScreenStyles.receiptInfo}>
          <View style={receiptScreenStyles.timeContainer}>
            <Ionicons
              style={{ marginRight: 10 }}
              name="time-outline"
              size={24}
              color={color}
            />
            <Text>{timeToCookText.trim() || receipt.time_to_cook}</Text>
          </View>
          <Button
            onPress={handleCreateList}
            style={receiptScreenStyles.createListButton}
            textStyle={receiptScreenStyles.createListButtonText}
            text="Створити список покупок"
          />
        </View>

        <Ingredients ingredients={receipt.ingredient} />
        <Steps steps={receipt.step} />
        <View style={{ height: 50 }} />
        {recommendation?.length > 0 && (
          <View style={receiptScreenStyles.recommendationContainer}>
            <Text style={receiptScreenStyles.recommendationTitle}>
              Рекомендації
            </Text>
            <FlatList
              style={[
                receiptsScreenStyles.receiptList,
                { flexDirection: "row" },
              ]}
              data={recommendation}
              horizontal
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        <Rating rating={rating} onRatingChange={handleRating} />
      </ScrollView>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
