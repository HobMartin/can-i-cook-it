import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const receiptScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  favoriteContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  search: {
    borderStyle: "solid",
    backgroundColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  receiptList: {
    flexDirection: "row",
    height: 275,
  },
});
