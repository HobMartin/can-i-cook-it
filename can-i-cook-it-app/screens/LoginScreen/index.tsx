import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { TouchableHighlight, TouchableOpacity } from "react-native";
import { AuthForm } from "../../components/AuthForm";
import { Text, useThemeColor, View } from "../../components/Themed";
import { auth } from "../../firebase";
import { updateUser } from "../../state/user";
import { loginScreenStyles } from "./styles";
import { router } from "expo-router";
import { supabase } from "../../initSupabase";

export default function LoginScreen() {
  const handleSubmit = async (values: any) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    console.log(user, error);

    if (user) {
      updateUser(user);
      router.replace("/(tabs)");
    }
  };

  const color = useThemeColor({}, "buttonBackground");

  return (
    <View style={loginScreenStyles.container}>
      <Text style={loginScreenStyles.title}>Вхід</Text>
      <AuthForm onSubmit={handleSubmit} submitText="Увійти" />
      <View>
        <Text>Не має акаунту?</Text>
        <TouchableOpacity onPress={() => router.replace("/signUp")}>
          <Text style={{ color }}>Зареєструватись</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
