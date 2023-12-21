import { Link, Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { Pressable, useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
export default function ListLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: "Рецепти",
          headerRight: () => (
            <Link href="/receipt/new" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="new" options={{ title: "Новий рецепт" }} />
    </Stack>
  );
}
