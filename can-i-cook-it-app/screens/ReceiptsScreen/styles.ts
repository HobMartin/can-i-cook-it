import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const receiptScreenStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
    backgroundColor: Colors.light.background,
  },
  favoriteContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  receiptContainer: {
    flex: 1,
    borderRadius: 10,
    width: "100%",
    padding: 10,
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
    flexDirection: "column",
    height: 575,
  },
});
