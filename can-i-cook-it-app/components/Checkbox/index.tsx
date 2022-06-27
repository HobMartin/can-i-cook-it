import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { FC, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, useThemeColor, View } from "../Themed";

interface CheckboxProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  lightColor?: string;
  darkColor?: string;
  onShopIconClick?: () => void;
  size?: number;
  text?: string;
  style?: any;
}

export const Checkbox: FC<CheckboxProps> = ({
  value,
  onValueChange,
  lightColor,
  darkColor,
  onShopIconClick,
  size,
  text,
  style,
}) => {
  const themeColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const [checked, setChecked] = useState(!!value);
  const handleCheckboxClick = () => {
    setChecked((checked) => {
      onValueChange && onValueChange(!checked);
      return !checked;
    });
  };

  const icon = checked ? "checkbox-outline" : "ios-square-outline";

  return (
    <View style={checkboxStyle.container}>
      <TouchableWithoutFeedback
        onPress={handleCheckboxClick}
        style={checkboxStyle.box}
      >
        <Ionicons name={icon} size={size ?? 24} color={themeColor} />
      </TouchableWithoutFeedback>
      {text && (
        <Text
          style={
            style?.text
              ? { ...checkboxStyle.text, ...style.text }
              : checkboxStyle.text
          }
        >
          {text}
        </Text>
      )}
      {!!onShopIconClick && (
        <TouchableWithoutFeedback
          onPress={onShopIconClick}
          style={{ alignSelf: "flex-end" }}
        >
          <Ionicons name="basket-outline" size={24} color={themeColor} />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const checkboxStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    width: "100%",
  },
  text: {
    paddingLeft: 10,
  },
  box: {
    width: 25,
  },
});
