import React from "react";
import { Image, ImageBackground } from "react-native";
import { useTranslation as t } from "../../hooks/useTranslate";
import { View, Text } from "../Themed";
import { receiptCardStyles } from "./styles";

interface ReceiptCardProps {
  title: string;
  image?: string;
}

export function ReceiptCard({ title, image }: ReceiptCardProps) {
  return (
    <View style={receiptCardStyles.container}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{ borderRadius: 10 }}
        style={receiptCardStyles.image}
        source={{ uri: image }}
      >
        <View style={receiptCardStyles.titleWrapper}>
          <Text style={receiptCardStyles.title}>{t(title)}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
