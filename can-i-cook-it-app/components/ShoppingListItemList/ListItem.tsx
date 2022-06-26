import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { FC, useState } from "react";
import { Checkbox } from "../Checkbox";
import { StyleSheet } from "react-native";
import { useThemeColor } from "../Themed";

interface ListItemProps {
  name: string;
}

export const ListItem: FC<ListItemProps> = ({ name }) => {
  const [checked, setChecked] = useState(false);

  const color = useThemeColor({}, "tabIconDefault");

  return (
    <View style={{ ...listItemStyle.container, backgroundColor: color }}>
      <Checkbox text={name} value={checked} onValueChange={setChecked} />
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
