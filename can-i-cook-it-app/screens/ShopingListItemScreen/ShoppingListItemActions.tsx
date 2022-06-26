import { View, Text, Button } from "../../components/Themed";
import React, { FC } from "react";
import { Dayjs } from "dayjs";
import { DatePicker } from "../../components/DatePicker";

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
        <DatePicker value={dateValue} onChange={onDateChange} />
        <View style={{ backgroundColor: "transparent" }}>
          <Text style={{ fontSize: 18 }}>Нагадування</Text>
          <Text>{dateValue.format("DD MMMM YYYY")}</Text>
          <Text style={{ textAlign: "center" }}>
            {dateValue.format("HH:mm")}
          </Text>
        </View>
      </View>
    </View>
  );
};
