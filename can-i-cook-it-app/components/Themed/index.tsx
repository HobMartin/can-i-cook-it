/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
  TouchableOpacity as DefaultTouchableOpacity,
} from "react-native";

import { SafeAreaView as DefaultSafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import {
  ButtonProps,
  SafeAreaProps,
  TextInputProps,
  TextProps,
  ViewProps,
} from "./types";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props["light"];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: lightColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: lightColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: lightColor }, "text");
  const borderColor = useThemeColor(
    { light: lightColor, dark: lightColor },
    "borderColor"
  );
  const placeholderTextColor = useThemeColor(
    { light: lightColor, dark: lightColor },
    "placeholder"
  );

  return (
    <DefaultTextInput
      placeholderTextColor={placeholderTextColor}
      style={[{ color, borderColor }, style]}
      {...otherProps}
    />
  );
}

export function Button(props: ButtonProps) {
  const {
    style,
    text,
    textStyle,
    icon,
    iconColor = "white",
    lightColor,
    darkColor,
    ...otherProps
  } = props;
  const borderColor = useThemeColor(
    { light: lightColor, dark: lightColor },
    "borderColor"
  );

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: lightColor },
    "buttonBackground"
  );

  return (
    <DefaultTouchableOpacity
      style={[{ borderColor, backgroundColor, flexDirection: "row" }, style]}
      {...otherProps}
    >
      {icon && <Ionicons name={icon} size={24} color={iconColor} />}
      {!!text && (
        <Text
          darkColor="#fff"
          lightColor="#fff"
          style={[{ marginLeft: 10 }, textStyle]}
        >
          {text}
        </Text>
      )}
    </DefaultTouchableOpacity>
  );
}

export function SafeAreaView(props: SafeAreaProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: lightColor },
    "background"
  );

  return (
    <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
