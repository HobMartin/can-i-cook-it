import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
export const receiptCardStyles = StyleSheet.create({
  container: {
    marginRight: 20,
    borderRadius: 10,
    height: 220,
    width: 300,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  titleWrapper: {
    borderRadius: 10,
    flex: 1,
    padding: 10,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    flexWrap: "wrap",
    fontWeight: "bold",
  },
});
