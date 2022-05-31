import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const receiptScreenStyles = StyleSheet.create({
  imageBackground: {
    height: 400,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textInput: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 20,
  },
  receiptList: {
    flexDirection: "row",
    height: 350,
  },
  calories: {
    alignSelf: "flex-end",
    fontSize: 15,
    borderRadius: 10,
    color: "white",
    padding: 5,
    width: 100,
    textAlign: "center",
    backgroundColor: Colors.light.tabIconDefault,
    marginBottom: 10,
  },
  ingredient: {
    alignItems: "center",
    marginHorizontal: 20,
  },

  ingredientInfo: {
    height: 105,
    padding: 20,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  ingredientTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ingredientText: {
    fontSize: 14,
    textAlign: "center",
  },
  receiptInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  urlSource: {
    backgroundColor: Colors.light.tabIconDefault,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
