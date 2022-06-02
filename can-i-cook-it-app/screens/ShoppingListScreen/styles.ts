import { StyleSheet } from "react-native";

export const shoppingListScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subItem: {
    flexDirection: "column",
    padding: 15,
  },
  listItem: {
    marginBottom: 40,
    borderStyle: "solid",
    borderWidth: 1,
  },
  subItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subItemAmount: {
    fontSize: 12,
    fontStyle: "italic",
  },
  listItemContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
