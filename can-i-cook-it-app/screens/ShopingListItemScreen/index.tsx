import { Share } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

import { Text, View, Button } from "../../components/Themed";
import { ShoppingListItemStyles } from "./styles";
import { ShoppingListItemList } from "../../components/ShoppingListItemList";
import { DatePicker } from "../../components/DatePicker";
import { UseNotification } from "../../hooks/useNotification";

export default function ShoppingListItemScreen({ route }: any) {
  const { item } = route?.params;

  const [date, setDate] = useState(dayjs());

  const { schedulePushNotification } = UseNotification("Hello", "World", date);

  const onShare = async () => {
    try {
      await schedulePushNotification();
      const result = await Share.share({
        message: `Потрібно купити для ${item.name}:\n${item.list
          .map((el: any) => "● " + el.name)
          .join("\n")}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDateChange = (date: Dayjs) => {
    console.log(date);
    setDate(date.set("second", 0));
  };

  return (
    <View style={ShoppingListItemStyles.container}>
      <Text style={ShoppingListItemStyles.title}>{item.name}</Text>
      <ShoppingListItemList list={item.list} />
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
          style={ShoppingListItemStyles.share}
          onPress={onShare}
          icon="share-outline"
          text="Поділитись"
        />
        <View style={{ backgroundColor: "transparent" }}>
          <DatePicker onChange={handleDateChange} />
          <View style={{ backgroundColor: "transparent" }}>
            <Text style={{ fontSize: 18 }}>Нагадування</Text>
            <Text>{date.format("DD MMMM YYYY")}</Text>
            <Text style={{ textAlign: "center" }}>{date.format("HH:mm")}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
