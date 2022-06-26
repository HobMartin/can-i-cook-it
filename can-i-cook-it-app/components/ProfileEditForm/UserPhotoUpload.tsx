import { View, Text, Button } from "../Themed";
import { Image, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { checkCameraPermission } from "../../screens/PredictScreen/helper";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../firebase";
import { update } from "firebase/database";
import { updateProfile } from "firebase/auth";

export const UserPhotoUpload = () => {
  const [userPhoto, setUserPhoto] = useState(
    auth.currentUser?.photoURL ??
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
  );
  useEffect(() => {
    checkCameraPermission();
  }, []);

  const openGallery = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!pickerResult.cancelled) {
      await uploadImage(pickerResult.uri);
    }
  };

  const uploadImage = async (image: string) => {
    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, "image/" + new Date().toISOString());

    uploadBytes(storageRef, blob)
      .then(async (snapshot) => {
        const downloadUrl = await getDownloadURL(
          ref(storage, snapshot.ref.fullPath)
        );
        auth.currentUser &&
          updateProfile(auth.currentUser, {
            photoURL: downloadUrl,
          });
        setUserPhoto(downloadUrl);
      })
      .catch((error) => alert("Щось пішло не так!"));
  };
  return (
    <Pressable onPress={openGallery}>
      <Image
        style={style.userAvatar}
        source={{
          uri: userPhoto,
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
