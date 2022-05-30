import { TouchableOpacity } from "react-native";

import { Text, View } from "../../components/Themed";
import { notFoundScreenStyles } from "./styles";

export default function NotFoundScreen({ navigation }: any) {
  return (
    <View style={notFoundScreenStyles.container}>
      <Text style={notFoundScreenStyles.title}>
        Як ти сюди взагалі потрапив?
      </Text>
      <TouchableOpacity
        onPress={() => navigation.replace("Root")}
        style={notFoundScreenStyles.link}
      >
        <Text style={notFoundScreenStyles.linkText}>
          Повертутись на головний екран
        </Text>
      </TouchableOpacity>
    </View>
  );
}
