import { View, Text, TextInput, Button } from "../../components/Themed";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useUnit } from "effector-react";
import { $image } from "../PredictScreen/model";
import { $predictionResult, fxPredictFoodImage, resetImage } from "./model";
import { predictImageScreenStyles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { StackActions } from "@react-navigation/native";
import { router } from "expo-router";

export default function PredictionImageScreen({ navigation }: any) {
  const [incorrectForm, setIncorrectForm] = useState(false);
  const [foodName, setFoodName] = useState("");
  const image = useUnit($image);
  const predictionResult = useUnit($predictionResult);
  const loading = useUnit(fxPredictFoodImage.pending);

  useEffect(() => {
    fxPredictFoodImage(image);
    return () => {
      resetImage();
    };
  }, []);

  const handleCorrectAnswer = () => {
    console.log(predictionResult.food_name);

    router.replace({
      pathname: "/receipt",
      params: {
        search: predictionResult.food_name,
      },
    });
    // navigation.dispatch(StackActions.pop(1));
    // navigation.navigate("ReceiptsScreens", {
    //   screen: "Receipts",
    //   params: {
    //     name: predictionResult,
    //   },
    // });
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
      {/* 
        {predictionResult.map((el) => (
          <Pressable
            key={el.food_name}
            style={{ padding: 10, marginBottom: 10 }}
          >
   
          </Pressable>
        ))}
       */}
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Text style={predictImageScreenStyles.result}>
          {predictionResult.food_name} - {predictionResult.model_score}
        </Text>
      </View>
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
