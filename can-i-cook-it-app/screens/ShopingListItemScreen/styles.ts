import { StyleSheet } from "react-native";

export const ShoppingListItemStyles = StyleSheet.create({
  container: {
    height: 400,
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    flexWrap: "wrap",
    width: "80%",
    textAlign: "center",
  },
  share: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "flex-start",
  },
});
