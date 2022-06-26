import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";

export const getReceiptId = (link: string) => {
  const [href, search] = link.split("?");
  const hrefArr = href.split("/");
  return hrefArr.pop();
};

export const storeRecentReceipts = async (item: any) => {
  try {
    const recent = await AsyncStorage.getItem("recentReceipt");
    if (recent !== null) {
      const recentReceipt = JSON.parse(recent);
      console.log({ recentReceipt });
      const isExist = recentReceipt.some((el: any) => _.isEqual(el, item));

      if (recentReceipt.length < 5) {
        if (!isExist) {
          recentReceipt.unshift(item);
        }
      } else {
        recentReceipt.pop();
        !isExist && recentReceipt.unshift(item);
      }
      await AsyncStorage.setItem(
        "recentReceipt",
        JSON.stringify(recentReceipt)
      );
    } else {
      await AsyncStorage.setItem("recentReceipt", JSON.stringify([item]));
    }
  } catch (e: any) {
    console.log(e);
  }
};
