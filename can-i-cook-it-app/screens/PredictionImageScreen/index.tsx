import { View, Text, TextInput, Button } from "../../components/Themed";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { useStore } from "effector-react";
import { $image } from "../PredictScreen/model";
import { $predictionResult, fxPredictFoodImage, resetImage } from "./model";
import { predictImageScreenStyles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { StackActions } from "@react-navigation/native";

export default function PredictionImageScreen({ navigation }: any) {
  const [incorrectForm, setIncorrectForm] = useState(false);
  const [foodName, setFoodName] = useState("");
  const image = useStore($image);
  const predictionResult = useStore($predictionResult);
  const loading = useStore(fxPredictFoodImage.pending);

  useEffect(() => {
    fxPredictFoodImage(image);
    return () => {
      resetImage();
    };
  }, []);

  const handleCorrectAnswer = () => {
    const docRef = doc(
      db,
      predictionResult.food_name,
      `correct-${new Date().toISOString()}`
    );
    setDoc(docRef, {
      image,
    }).then(() => {
      navigation.dispatch(StackActions.pop(1));
      navigation.navigate("ReceiptsScreens", {
        screen: "Receipts",
        params: {
          name: predictionResult.food_name,
        },
      });
    });
  };

  const handleIncorrectAnswer = () => {
    setIncorrectForm(true);
  };
  const handleSubmit = () => {
    if (!foodName.trim().length) {
      return alert("Введіть назву страви");
    }
    const docRef = doc(db, foodName, `incorrect-${new Date().toISOString()}`);
    setDoc(docRef, {
      image,
    }).then(() => {
      navigation.dispatch(StackActions.pop(1));
      navigation.navigate("ReceiptsScreens", {
        screen: "Receipts",
        params: {
          name: foodName,
        },
      });
    });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={predictImageScreenStyles.container}>
      <Image
        source={{ uri: image }}
        style={{ height: 350, width: "100%", resizeMode: "stretch" }}
      />
      <Text style={predictImageScreenStyles.result}>
        {predictionResult.food_name}
      </Text>
      <Text style={predictImageScreenStyles.result}>
        Точність {predictionResult.model_score} %
      </Text>
      {incorrectForm ? (
        <View style={predictImageScreenStyles.foodNameForm}>
          <TextInput
            placeholder="Введіть назву страви"
            style={predictImageScreenStyles.input}
            value={foodName}
            onChangeText={(text) => setFoodName(text)}
          />
          <Button
            onPress={handleSubmit}
            style={predictImageScreenStyles.button}
            text="Підтвердити"
          />
        </View>
      ) : (
        <View style={predictImageScreenStyles.questionContainer}>
          <Text style={predictImageScreenStyles.question}>Це ваша страва?</Text>
          <View style={predictImageScreenStyles.questionOptions}>
            <TouchableOpacity onPress={handleCorrectAnswer}>
              <Ionicons name="checkmark-circle" size={50} color="#83BD75" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleIncorrectAnswer}>
              <Ionicons name="close-circle" size={50} color="#FF8C8C" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
