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
    justifyContent: "space-between",
    paddingBottom: 20,
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    marginBottom: 10,
  },
  stepsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  stepNumberContainer: {
    marginBottom: 10,
    backgroundColor: "#F6EFEE",
    padding: 5,
    paddingLeft: 10,
    width: 80,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  stepContainer: {
    marginBottom: 10,
  },
  stepImageContainer: {
    height: 200,
    width: "100%",
    marginVertical: 10,
  },
  stepImage: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    marginRight: 20,
  },
  favorite: {
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 20,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  ratingValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 14,
    marginBottom: 5,
  },
  stepText: {
    fontSize: 14,
    marginBottom: 5,
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
  createListButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  createListButtonText: {
    textAlign: "center",
    marginLeft: 0,
  },
  recommendationContainer: {
    // flexDirection: "row",
    height: 370,
    padding: 20,
    width: "100%",
  },
  recommendationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    height: 50,
  },
  recommendationText: {},
  recommendationImage: {
    height: 200,
    width: 200,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  recommendationTitleContainer: {
    flexDirection: "row",
    padding: 10,
  },
});
