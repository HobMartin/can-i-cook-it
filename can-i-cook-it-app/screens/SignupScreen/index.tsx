import { Text, useThemeColor, View } from "../../components/Themed";
import { TouchableHighlight, TouchableOpacity } from "react-native";
import { singupScreenStyles } from "./styles";
import { AuthForm } from "../../components/AuthForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { updateUser } from "../../state/user";
import { router } from "expo-router";
import { supabase } from "../../initSupabase";

export default function SignUpScreen({ navigation }: any) {
  const handleSubmit = async (values: any) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (error) {
      console.error(error);
    }

    if (user) {
      updateUser(user);
      router.replace("/(tabs)");
    }
    // createUserWithEmailAndPassword(auth, values.email, values.password)
    //   .then((user) => {

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  const color = useThemeColor({}, "buttonBackground");

  return (
    <View style={singupScreenStyles.container}>
      <Text style={singupScreenStyles.title}>Реєстрація</Text>
      <AuthForm onSubmit={handleSubmit} submitText="Реєстрація" />
      <Text>Уже є акаунт?</Text>
      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={{ color }}>Увійти</Text>
      </TouchableOpacity>
    </View>
  );
}
