import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const newReceiptScreenStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
    backgroundColor: Colors.light.background,
  },
  favoriteContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  receiptList: {
    flexDirection: "row",
    height: 275,
  },
});
