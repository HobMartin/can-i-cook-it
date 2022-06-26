import {
  View,
  Text,
  SafeAreaView,
  useThemeColor,
  Button,
} from "../../components/Themed";
import React, { useState } from "react";
import { profileScreenStyles } from "./styles";
import { useStore } from "effector-react";
import { $user, updateUser } from "../../state/user";
import { Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { signOut, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { ProfileEditForm } from "../../components/ProfileEditForm";
import { UserPhotoUpload } from "../../components/ProfileEditForm/UserPhotoUpload";

export default function ProfileScreen({ navigation }: any) {
  const currentUser = useStore($user);
  const [editing, setEditing] = useState(false);
  const color = useThemeColor({}, "text");
  const userOverviewColor = useThemeColor({}, "buttonBackground");

  const logout = () => {
    signOut(auth).then(() => navigation.navigate("Auth"));
  };

  const handleProfileEdit = (value: any) => {
    const user = auth.currentUser;
    if (user) {
      if (value.displayName.trim().length) {
        updateProfile(user, {
          displayName: value.displayName,
        }).then(() => {
          updateUser({ ...currentUser, displayName: value.displayName.trim() });
        });
      }
      if (value.password.trim().length) {
        updatePassword(user, value.password.trim());
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
            {currentUser.displayName ?? ""}
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
