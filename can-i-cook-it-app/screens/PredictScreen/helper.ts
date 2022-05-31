import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const checkCameraPermission = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Для коректної роботи додатку потрібен дозвіл до камери");
    }
  }
};
