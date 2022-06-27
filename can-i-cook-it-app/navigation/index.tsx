/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";

import ReceiptScreen from "../screens/ReceiptScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignupScreen";
import ReceiptsScreen from "../screens/ReceiptsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PredictScreen from "../screens/PredictScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import PredictionImageScreen from "../screens/PredictionImageScreen";
import ShoppingListItemScreen from "../screens/ShopingListItemScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarLabelStyle: {
          color: Colors[colorScheme].text,
        },
        tabBarStyle: { height: 65, paddingTop: 10, paddingBottom: 10 },
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Головна",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome5
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="ShopsScreens"
        component={ShoppingListNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          title: "Покупки",
        }}
      />
      <BottomTab.Screen
        name="PredictionScreens"
        component={PredictionNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
          title: "Визначення",
        }}
      />
      <BottomTab.Screen
        name="ReceiptsScreens"
        component={ReceiptNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="receipt" color={color} />
          ),
          title: "Рецепти",
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          title: "Профіль",
        }}
      />
    </BottomTab.Navigator>
  );
}

const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

const ReceiptStack = createStackNavigator();

function ReceiptNavigator() {
  return (
    <ReceiptStack.Navigator
      initialRouteName="Receipts"
      screenOptions={{ headerShown: false }}
    >
      <ReceiptStack.Screen name="Receipts" component={ReceiptsScreen} />
      <ReceiptStack.Screen name="Receipt" component={ReceiptScreen} />
    </ReceiptStack.Navigator>
  );
}

const PredictionStack = createStackNavigator();

function PredictionNavigator() {
  return (
    <PredictionStack.Navigator
      initialRouteName="Prediction"
      screenOptions={{ headerShown: false }}
    >
      <PredictionStack.Screen name="Prediction" component={PredictScreen} />
      <PredictionStack.Screen
        name="PredictionImage"
        component={PredictionImageScreen}
      />
    </PredictionStack.Navigator>
  );
}

const ShoppingListStack = createStackNavigator();

function ShoppingListNavigator() {
  return (
    <ShoppingListStack.Navigator
      initialRouteName="ShoppingLists"
      screenOptions={{ headerShown: false }}
    >
      <ShoppingListStack.Screen
        name="ShoppingLists"
        component={ShoppingListScreen}
      />
      <ShoppingListStack.Screen
        name="ShoppingList"
        component={ShoppingListItemScreen}
      />
    </ShoppingListStack.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
