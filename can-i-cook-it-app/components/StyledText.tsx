import { Text } from "./Themed";
import { TextProps } from "./Themed/types";

export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}
