import React from "react";
import { Image, ImageBackground, StyleProp, ViewStyle } from "react-native";
import { View, Text } from "../Themed";
import { receiptCardStyles } from "./styles";

interface ReceiptCardProps {
  title: string;
  image?: string;
  containerStyle?: any;
}

export function ReceiptCard({
  title,
  image,
  containerStyle,
}: ReceiptCardProps) {
  return (
    <View style={containerStyle ?? receiptCardStyles.container}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{ borderRadius: 10 }}
        style={receiptCardStyles.image}
        source={{ uri: image }}
      >
        <View style={receiptCardStyles.titleWrapper}>
          <Text style={receiptCardStyles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
