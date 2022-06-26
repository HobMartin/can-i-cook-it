import React, { FC, useState } from "react";
import { Button, View, Text } from "../Themed";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs, { Dayjs } from "dayjs";
import { StyleSheet } from "react-native";

interface DatePickerProps {
  value?: Dayjs;
  onChange?: (date: Dayjs) => void;
  type?: "date" | "time" | "datetime";
}

export const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  type = "datetime",
}) => {
  const [date, setDate] = useState(value ?? dayjs());

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const date = dayjs(selectedDate);
    onChange && onChange(date);
    setDate(date);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date.toDate(),
      onChange: handleChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={{ flexDirection: "row", backgroundColor: "transparent" }}>
      {(type === "date" || type === "datetime") && (
        <Button
          onPress={showDatepicker}
          icon="calendar"
          style={[datePickerStyle.dateButton, { marginRight: 10 }]}
        />
      )}
      {(type === "time" || type === "datetime") && (
        <Button
          onPress={showTimepicker}
          style={datePickerStyle.dateButton}
          icon="time"
        />
      )}
    </View>
  );
};

const datePickerStyle = StyleSheet.create({
  dateButton: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
});
