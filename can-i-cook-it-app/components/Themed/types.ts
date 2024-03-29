import {
  TextProps as DefaultTextProps,
  ViewProps as DefaultViewProps,
  TextInputProps as DefaultTextInputProps,
  TouchableHighlightProps as DefaultTouchableHighlightProps,
  SafeAreaView as DefaultSafeAreaView,
  StyleProp,
  TextStyle,
} from "react-native";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type CustomButton = {
  text?: string;
  icon?: any;
  iconColor?: string;
  textStyle?: StyleProp<TextStyle>;
};

export type TextProps = ThemeProps & DefaultTextProps;
export type ViewProps = ThemeProps & DefaultViewProps;
export type TextInputProps = ThemeProps & DefaultTextInputProps;
export type ButtonProps = ThemeProps &
  CustomButton &
  DefaultTouchableHighlightProps;
export type SafeAreaProps = ThemeProps & DefaultSafeAreaView["props"];
