import { useState } from "react";
import { Button, Text, View } from "../Themed";
import { SelectImageModal } from "../SelectImageModal";
import { Image } from "react-native";

type Props = {
  image: ReceiptImage | null;
  onChange: (image: ReceiptImage | null) => void;
};

export type ReceiptImage = {
  uri: string;
  base64: string;
};

export const ReceiptImage = ({ image, onChange }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddImage = (image: { uri: string; base64: string }) => {
    onChange(image);
  };
  const handleRemoveImage = () => {
    onChange(null);
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Фото
      </Text>
      {image?.uri && (
        <View
          style={{
            position: "relative",
            height: 200,
            width: "100%",
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <Image
            source={{ uri: image?.uri }}
            style={{
              width: "100%",
              height: "100%",
              marginBottom: 20,
              borderRadius: 10,
            }}
          />
          <Button
            icon="close"
            onPress={() => {
              handleRemoveImage();
            }}
            style={{
              height: 30,
              alignItems: "center",
              backgroundColor: "#df4759",
              justifyContent: "center",
              aspectRatio: 1,
              borderRadius: 100,
              position: "absolute",
              top: -10,
              right: -10,
            }}
          />
        </View>
      )}
      {!image?.uri && (
        <View
          style={{
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            style={{
              borderColor: "#000",
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "transparent",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            textStyle={{ color: "#000" }}
            icon="image"
            iconColor="#000"
            text="Додати фото"
            onPress={() => setModalVisible(true)}
          />
          <SelectImageModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onImageSelect={(uri, base64) => {
              handleAddImage({ uri, base64 });
            }}
          />
        </View>
      )}
    </View>
  );
};
