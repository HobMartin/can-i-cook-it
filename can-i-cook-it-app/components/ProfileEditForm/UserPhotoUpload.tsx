import { View, Text, Button } from "../Themed";
import { Image, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { checkCameraPermission } from "../../screens/PredictScreen/helper";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../firebase";
import { update } from "firebase/database";
import { updateProfile } from "firebase/auth";
import { supabase } from "../../initSupabase";
import { useUnit } from "effector-react";
import { $user } from "../../state/user";
import { uploadToSupabase } from "../../utils/uploadToSupabase";

export const UserPhotoUpload = () => {
  const currentUser = useUnit($user);
  useEffect(() => {
    checkCameraPermission();
  }, []);

  const openGallery = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });
    if (!pickerResult.canceled) {
      await uploadImage(pickerResult.assets[0].base64);
    }
  };

  const uploadImage = async (image: string | null | undefined) => {
    if (!image) {
      return;
    }

    const publicUrl = await uploadToSupabase(
      image,
      "jpg",
      "avatars",
      `${currentUser.id}/avatar`
    );

    const { data: user } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl },
    });

    if (!user) {
      return;
    }
  };
  return (
    <Pressable onPress={openGallery}>
      <Image
        style={style.userAvatar}
        source={{
          uri:
            currentUser.user_metadata?.avatar_url ??
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        }}
      />
    </Pressable>
  );
};

const style = StyleSheet.create({
  userAvatar: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
});
