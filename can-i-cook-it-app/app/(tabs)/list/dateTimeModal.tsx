import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Text, View } from "../../../components/Themed";

export default function ModalScreen() {
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    console.log(currentDate);
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        testID="dateTimePicker"
        value={new Date()}
        mode={"date"}
        is24Hour={true}
        onChange={onChange}
      />
      <DateTimePicker
        testID="dateTimePicker"
        value={new Date()}
        mode={"time"}
        is24Hour={true}
        onChange={onChange}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
