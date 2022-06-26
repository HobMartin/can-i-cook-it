import { Share } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

import { Text, View, Button } from "../../components/Themed";
import { ShoppingListItemStyles } from "./styles";
import { ShoppingListItemList } from "../../components/ShoppingListItemList";
import { schedulePushNotification } from "../../hooks/useNotification";
import { fxUpdateShoppingListItem } from "../../state/shoppingList";
import { ShoppingListItemActions } from "./ShoppingListItemActions";
import { deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";

export default function ShoppingListItemScreen({ route, navigation }: any) {
  const { item } = route?.params;

  const [date, setDate] = useState(dayjs(item.notify));

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Потрібно купити для ${item.name}:\n${item.list
          .map((el: any) => "● " + el.name)
          .join("\n")}`,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDateChange = async (date: Dayjs) => {
    setDate(date.set("second", 0));
    await fxUpdateShoppingListItem({
      id: item.id,
      data: { notify: Timestamp.fromDate(date.toDate()) },
    });
    await schedulePushNotification("Нагадування про покупку", item.name, date);
  };

  const handleDelete = () => {
    deleteDoc(doc(db, "ShoppingLists", item.id)).then(() => {
      navigation.navigate("ShoppingLists");
    });
  };

  return (
    <View style={ShoppingListItemStyles.container}>
      <Text style={ShoppingListItemStyles.title}>{item.name}</Text>
      <ShoppingListItemList list={item.list} id={item.id} />
      <ShoppingListItemActions
        dateValue={date}
        onShare={handleShare}
        onDateChange={handleDateChange}
      />
      <View style={{ height: 150, justifyContent: "flex-end" }}>
        <Button
          style={ShoppingListItemStyles.removeButton}
          icon="trash"
          onPress={handleDelete}
          text="Видалити список"
        />
      </View>
    </View>
  );
}
