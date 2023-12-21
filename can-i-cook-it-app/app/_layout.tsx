import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ThemeProvider as RapiUIThemeProvider } from "react-native-rapi-ui";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";

import { useEffect } from "react";
import { LogBox, useColorScheme } from "react-native";
import { $user, updateUser } from "../state/user";
import { useUnit } from "effector-react";
import { supabase } from "../initSupabase";
import { $selectedShoppingList } from "../state/shoppingList";

LogBox.ignoreAllLogs();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const user = useUnit($user);
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (!loaded) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((user, session) => {
      console.log("auth changed");

      if (session) {
        updateUser(session.user);
      } else {
        router.replace("/login");
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [loaded]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const currentSelectedShoppingList = useUnit($selectedShoppingList);

  return (
    <RapiUIThemeProvider theme={colorScheme ?? "light"}>
      <ThemeProvider
        value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
      >
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signUp" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen
            name="receipt-view"
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen
            name="last-visited"
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen
            name="list-view"
            options={{
              headerBackVisible: true,
              presentation: "modal",
              title: currentSelectedShoppingList?.name,
            }}
          />
        </Stack>
      </ThemeProvider>
    </RapiUIThemeProvider>
  );
}

//ivanderda1999@gmail.com
