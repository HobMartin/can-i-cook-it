import { View, Text, Button } from "../../components/Themed";
import React, { FC } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "../../components/DatePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

interface ShoppingListItemActionsProps {
  onShare: () => void;
  dateValue: Dayjs;
  onDateChange: (date: Dayjs) => void;
}

export const ShoppingListItemActions: FC<ShoppingListItemActionsProps> = ({
  onShare,
  dateValue,
  onDateChange,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        justifyContent: "space-between",
        backgroundColor: "transparent",
        width: "90%",
      }}
    >
      <Button
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          alignSelf: "flex-start",
        }}
        onPress={onShare}
        icon="share-outline"
        text="Поділитись"
      />
      <View style={{ backgroundColor: "transparent" }}>
        {Platform.OS === "android" && (
          <DatePicker value={dateValue} onChange={onDateChange} />
        )}
        <View style={{ backgroundColor: "transparent", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>Нагадування</Text>
          <View
            style={{
              backgroundColor: "transparent",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={dateValue.toDate()}
              mode={"date"}
              is24Hour={true}
              onChange={(_, date) => onDateChange(dayjs(date))}
            />
            <DateTimePicker
              testID="dateTimePicker"
              value={dateValue.toDate()}
              mode={"time"}
              is24Hour={true}
              onChange={(_, date) => onDateChange(dayjs(date))}
            />
          </View>
          {Platform.OS === "android" && (
            <>
              <Text>{dateValue.format("DD MMMM YYYY")}</Text>
              <Text style={{ textAlign: "center" }}>
                {dateValue.format("HH:mm")}
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
