import { Text, View } from "../../components/Themed";
import { TouchableHighlight } from "react-native";
import { singupScreenStyles } from "./styles";
import { AuthForm } from "../../components/AuthForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { updateUser } from "../../state/user";

export default function SignUpScreen({ navigation }: any) {
  const handleSubmit = (values: any) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((user) => {
        updateUser(user.user);
        navigation.replace("Root");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={singupScreenStyles.container}>
      <Text style={singupScreenStyles.title}>Реєстрація</Text>
      <AuthForm onSubmit={handleSubmit} submitText="Реєстрація" />
      <Text>Уже є аккаунт?</Text>
      <TouchableHighlight onPress={() => navigation.replace("Login")}>
        <Text>Увійти</Text>
      </TouchableHighlight>
    </View>
  );
}
