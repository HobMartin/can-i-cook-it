import { Platform, Share } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

import { Text, View, Button } from "../../components/Themed";
import { ShoppingListItemStyles } from "./styles";
import { ShoppingListItemList } from "../../components/ShoppingListItemList";
import { schedulePushNotification } from "../../hooks/useNotification";
import {
  ShoppingList,
  fxDeleteShoppingList,
  fxUpdateShoppingListItem,
} from "../../state/shoppingList";
import { ShoppingListItemActions } from "./ShoppingListItemActions";
import { deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

type Props = {
  list: ShoppingList;
};

export default function ShoppingListItemScreen({ list }: Props) {
  const [date, setDate] = useState(dayjs(list?.notify));

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Потрібно купити для ${list.name}:\n${list.list
          .map((el: any) => "● " + el.name)
          .join("\n")}`,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDateChange = async (date: Dayjs) => {
    if (date.isSame(dayjs(list.notify))) return;
    setDate(date.set("second", 0));
    await fxUpdateShoppingListItem({
      id: list.id,
      data: { notify: date.toISOString() },
    });
    // await schedulePushNotification("Нагадування про покупку", list.name, date);
  };

  const handleDelete = async () => {
    await fxDeleteShoppingList(list.id);
    router.replace("/list");
  };

  return (
    <View style={ShoppingListItemStyles.container}>
      {/* <Text style={ShoppingListItemStyles.title}>{list.name}</Text> */}
      <ShoppingListItemList list={list.list} id={list.id} />
      <ShoppingListItemActions
        dateValue={date}
        onShare={handleShare}
        onDateChange={handleDateChange}
      />
      <View
        style={{
          height: 150,
          justifyContent: "flex-end",
          backgroundColor: "transparent",
        }}
      >
        <Button
          style={ShoppingListItemStyles.removeButton}
          icon="trash"
          onPress={handleDelete}
          text="Видалити список"
        />
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
