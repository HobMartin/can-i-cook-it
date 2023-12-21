import { useEffect, useState } from "react";
import { checkCameraPermission } from "../../screens/PredictScreen/helper";
import { Image, Modal, Pressable, StyleSheet } from "react-native";
import { Button, Text, View } from "../Themed";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
type Props = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  onImageSelect: (uri: string, base64: string) => void;
};

export const SelectImageModal = ({
  modalVisible,
  setModalVisible,
  onImageSelect,
}: Props) => {
  const [imageAssets, setImageAssets] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const openCamera = async () => {
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      allowsMultipleSelection: false,

      base64: true,
    });
    if (!pickerResult.canceled) {
      setImageAssets(pickerResult.assets);
    }
  };

  const openGallery = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [16, 9],
      base64: true,
    });
    if (!pickerResult.canceled) {
      setImageAssets(pickerResult.assets);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <BlurView intensity={30} tint="light" style={styles.centeredView}>
        <View style={styles.modalView}>
          <Button
            style={{
              marginTop: 10,
              padding: 5,
              marginRight: 10,
              backgroundColor: "transparent",
              justifyContent: "flex-end",
              alignSelf: "flex-end",
            }}
            iconColor="#000"
            icon="close"
            onPress={() => setModalVisible(!modalVisible)}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 20,
              marginTop: 0,
              width: "100%",
            }}
          >
            <Text style={styles.modalText}>Виберіть фото</Text>
            <View style={{ marginBottom: 20 }}>
              {imageAssets.length > 0 && (
                <Image
                  style={{ width: 250, height: 200 }}
                  source={{ uri: imageAssets[0]?.uri }}
                />
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                text="Відкрити камеру"
                onPress={openCamera}
                style={{
                  marginBottom: 10,
                  marginEnd: 20,
                  padding: 10,
                  borderRadius: 10,
                }}
                textStyle={{ marginLeft: 0 }}
              />
              <Button
                text="Відкрити галерею"
                onPress={openGallery}
                style={{ marginBottom: 10, padding: 10, borderRadius: 10 }}
                textStyle={{ marginLeft: 0 }}
              />
            </View>
            {imageAssets.length > 0 && (
              <View
                style={{
                  alignItems: "flex-end",
                  width: "100%",
                  height: "auto",
                }}
              >
                <Button
                  text="Підтвердити"
                  onPress={() => {
                    onImageSelect(
                      imageAssets[0].uri,
                      imageAssets[0].base64 ?? ""
                    );
                    setModalVisible(false);
                  }}
                  style={{
                    marginTop: 20,
                    marginEnd: 20,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "#42ba96",
                  }}
                  textStyle={{ marginLeft: 0 }}
                />
              </View>
            )}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
