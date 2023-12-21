import {
  Text,
  SafeAreaView,
  View,
  useThemeColor,
} from "../../components/Themed";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { predictScreenStyles } from "./styles";
import { Platform, Image, TouchableOpacity } from "react-native";
import { Question_IL } from "../../assets/illustration";
import { checkCameraPermission } from "./helper";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { updateImage } from "./model";
import { supabase } from "../../initSupabase";
import { router } from "expo-router";
import { uploadToSupabase } from "../../utils/uploadToSupabase";

export default function PredictScreen({ navigation }: any) {
  useEffect(() => {
    checkCameraPermission();
  }, []);

  const openCamera = async () => {
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (!pickerResult.canceled) {
      await uploadImage(pickerResult.assets[0].uri);
    }
  };

  const openGallery = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (!pickerResult.canceled) {
      await uploadImage(pickerResult.assets[0].base64);
    }
  };

  const uploadImage = async (image: string | null | undefined) => {
    if (!image) {
      return;
    }

    const publicUrl = await uploadToSupabase(image, "jpg", "Prediction");
    updateImage(publicUrl);
    console.log(publicUrl);

    router.push("/predict/result");
  };

  const backgroundColor = useThemeColor({}, "buttonBackground");
  return (
    <SafeAreaView style={predictScreenStyles.container}>
      <Image source={Question_IL} style={predictScreenStyles.image} />
      <View>
        <TouchableOpacity
          onPress={openGallery}
          style={[predictScreenStyles.button, { backgroundColor }]}
        >
          <Text>Вибрати фото з галереї</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openCamera}
          style={[predictScreenStyles.button, { backgroundColor }]}
        >
          <Text>Зробити знімок</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
