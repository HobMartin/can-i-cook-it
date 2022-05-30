import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import { Text, View } from "../../components/Themed";
import { modalScreenStyles } from "./styles";

export default function ModalScreen() {
  return (
    <View style={modalScreenStyles.container}>
      <Text style={modalScreenStyles.title}>Modal</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
