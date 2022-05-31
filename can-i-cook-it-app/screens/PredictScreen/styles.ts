import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
export const predictScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    height: 350,
    width: "100%",
    resizeMode: "stretch",
  },
  button: {
    backgroundColor: Colors.light.tabIconDefault,
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: "center",
  },
});
