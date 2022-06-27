import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { TouchableHighlight, TouchableOpacity } from "react-native";
import { AuthForm } from "../../components/AuthForm";
import { Text, useThemeColor, View } from "../../components/Themed";
import { auth } from "../../firebase";
import { updateUser } from "../../state/user";
import { loginScreenStyles } from "./styles";

export default function LoginScreen({ navigation }: any) {
  const handleSubmit = (values: any) => {
    signInWithEmailAndPassword(auth, values.email, values.password).then(
      (user) => {
        updateUser(user.user);
        navigation.replace("Root");
      }
    );
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        updateUser(user);
        navigation.replace("Root");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const color = useThemeColor({}, "buttonBackground");

  return (
    <View style={loginScreenStyles.container}>
      <Text style={loginScreenStyles.title}>Вхід</Text>
      <AuthForm onSubmit={handleSubmit} submitText="Увійти" />
      <View>
        <Text>Не має аккаунту?</Text>
        <TouchableOpacity onPress={() => navigation.replace("Signup")}>
          <Text style={{ color }}>Зареєструватись</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
