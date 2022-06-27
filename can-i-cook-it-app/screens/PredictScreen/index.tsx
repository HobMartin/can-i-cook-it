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

export default function PredictScreen({ navigation }: any) {
  useEffect(() => {
    checkCameraPermission();
  }, []);

  const openCamera = async () => {
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!pickerResult.cancelled) {
      await uploadImage(pickerResult.uri);
    }
  };

  const openGallery = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!pickerResult.cancelled) {
      await uploadImage(pickerResult.uri);
    }
  };

  const uploadImage = async (image: string) => {
    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, "image/" + new Date().toISOString());

    uploadBytes(storageRef, blob)
      .then(async (snapshot) => {
        const downloadUrl = await getDownloadURL(
          ref(storage, snapshot.ref.fullPath)
        );
        updateImage(downloadUrl);
        navigation.navigate("PredictionImage");
      })
      .catch((error) => alert("Щось пішло не так!"));
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
