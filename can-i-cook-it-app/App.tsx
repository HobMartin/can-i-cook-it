import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Localization from "expo-localization";
import * as Notifications from "expo-notifications";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import "react-native-gesture-handler";
import dayjs from "dayjs";
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "./hooks/useNotification";
require("dayjs/locale/uk");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const targetLanguageCode = Localization.locale.substring(0, 2);
  dayjs.locale(targetLanguageCode);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
