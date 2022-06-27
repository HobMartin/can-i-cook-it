import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { FC, useState } from "react";
import { Checkbox } from "../Checkbox";
import { StyleSheet } from "react-native";
import { useThemeColor } from "../Themed";
import { openBrowserAsync } from "expo-web-browser";

interface ListItemProps {
  name: string;
  isChecked: boolean;
  lightColor?: string;
  darkColor?: string;
  onChange: (checked: boolean) => void;
}

export const ListItem: FC<ListItemProps> = ({
  name,
  isChecked = false,
  lightColor,
  darkColor,
  onChange,
}) => {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tabIconDefault"
  );

  const handleShopClick = () => {
    openBrowserAsync(
      "https://zakaz.atbmarket.com/sch?page=1&lang=uk&query=" + name
    );
  };

  return (
    <View style={{ ...listItemStyle.container, backgroundColor: color }}>
      <Checkbox
        text={name}
        value={isChecked}
        onValueChange={onChange}
        onShopIconClick={handleShopClick}
      />
    </View>
  );
};

const listItemStyle = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    marginBottom: 10,
    borderRadius: 20,
    alignItems: "flex-start",
  },
});
