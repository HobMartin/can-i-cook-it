import {
  View,
  Text,
  SafeAreaView,
  useThemeColor,
} from "../../components/Themed";
import React from "react";
import { profileScreenStyles } from "./styles";
import { useStore } from "effector-react";
import { $user } from "../../state/user";
import { Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function ProfileScreen({ navigation }: any) {
  const currentUser = useStore($user);
  const color = useThemeColor({}, "text");

  const logout = () => {
    signOut(auth).then(() => navigation.navigate("Auth"));
  };

  return (
    <SafeAreaView style={profileScreenStyles.container}>
      <View style={profileScreenStyles.header}>
        <Text style={profileScreenStyles.pageTitle}>Профіль</Text>
        <TouchableOpacity onPress={logout}>
          <AntDesign name="logout" size={24} color={color} />
        </TouchableOpacity>
      </View>
      <View style={profileScreenStyles.userOverview}>
        <Image
          style={profileScreenStyles.userAvatar}
          source={{
            uri:
              currentUser.photoURL ??
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          }}
        />
        <View style={profileScreenStyles.userInfo}>
          <Text style={profileScreenStyles.userInfoName}>
            {currentUser.displayName ?? ""}
          </Text>
          <Text style={profileScreenStyles.userInfoEmail}>
            {currentUser.email}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
