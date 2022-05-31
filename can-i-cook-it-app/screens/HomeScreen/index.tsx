import { Image } from "react-native";
import { Cook_IL } from "../../assets/illustration";
import { Text, SafeAreaView } from "../../components/Themed";
import { homeScreenStyles } from "./styles";

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={homeScreenStyles.container}>
      <Image
        source={Cook_IL}
        style={{ height: 350, width: "100%", resizeMode: "stretch" }}
      />
      <Text style={homeScreenStyles.title}>Давай щось приготуємо!</Text>
    </SafeAreaView>
  );
}
