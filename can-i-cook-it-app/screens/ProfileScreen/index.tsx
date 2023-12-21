import {
  View,
  Text,
  SafeAreaView,
  useThemeColor,
  Button,
} from "../../components/Themed";
import React, { useState } from "react";
import { profileScreenStyles } from "./styles";
import { useUnit } from "effector-react";
import { $user, updateUser } from "../../state/user";
import { Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { signOut, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { ProfileEditForm } from "../../components/ProfileEditForm";
import { UserPhotoUpload } from "../../components/ProfileEditForm/UserPhotoUpload";
import { router } from "expo-router";
import { supabase } from "../../initSupabase";

export default function ProfileScreen({ navigation }: any) {
  const currentUser = useUnit($user);
  const [editing, setEditing] = useState(false);
  const color = useThemeColor({}, "text");
  const userOverviewColor = useThemeColor({}, "buttonBackground");

  const logout = async () => {
    console.log("logout");
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const handleProfileEdit = async (value: any) => {
    const user = await supabase.auth.getUser();
    if (user) {
      if (value.displayName.trim().length) {
        await supabase.auth.updateUser({
          data: { full_name: value.displayName.trim() },
        });
      }
      if (value.password.trim().length) {
        await supabase.auth.updateUser({
          password: value.password.trim(),
        });
      }
    }
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  return (
    <SafeAreaView style={profileScreenStyles.container}>
      <View style={profileScreenStyles.header}>
        <Text style={profileScreenStyles.pageTitle}>Профіль</Text>
        <TouchableOpacity onPress={logout}>
          <AntDesign name="logout" size={24} color={color} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          profileScreenStyles.userOverview,
          { backgroundColor: userOverviewColor },
        ]}
      >
        <UserPhotoUpload />
        <View style={profileScreenStyles.userInfo}>
          <Text style={profileScreenStyles.userInfoName}>
            {currentUser.user_metadata?.full_name ?? ""}
          </Text>
          <Text style={profileScreenStyles.userInfoEmail}>
            {currentUser.email}
          </Text>
        </View>
      </View>
      <View style={profileScreenStyles.editProfile}>
        {!editing && (
          <Button
            onPress={() => {
              setEditing(true);
            }}
            style={profileScreenStyles.editProfileButton}
            icon="create-outline"
            text="Редагувати профіль"
          />
        )}
      </View>
      {editing && (
        <ProfileEditForm
          onSubmit={handleProfileEdit}
          submitText={"Підтвердити"}
          onCancel={cancelEdit}
        />
      )}
    </SafeAreaView>
  );
}
