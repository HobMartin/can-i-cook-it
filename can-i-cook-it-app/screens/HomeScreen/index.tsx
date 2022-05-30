import { useStore } from "effector-react";
import { Text, View, SafeAreaView } from "../../components/Themed";
import { $user } from "../../state/user";
import { homeScreenStyles } from "./styles";

export default function HomeScreen({ navigation }: any) {
  const currentUser = useStore($user);
  return (
    <SafeAreaView style={homeScreenStyles.container}>
      <Text style={homeScreenStyles.title}>
        {currentUser.email ? `Привіт, ${currentUser.email} ` : "Привіт "}
        давай дізнаємось чи можеш ти це приготувати
      </Text>
    </SafeAreaView>
  );
}
