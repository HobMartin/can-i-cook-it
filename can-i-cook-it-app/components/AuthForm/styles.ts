import { StyleSheet } from "react-native";
export const authFormStyles = StyleSheet.create({
  container: {
    width: "90%",
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 10,
    height: 50,
    padding: 10,
  },
  inputErrorText: {
    marginBottom: 10,
  },
  submit: {
    alignSelf: "stretch",
    textAlign: "center",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  googleButton: {
    alignSelf: "stretch",
    textAlign: "center",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
  },
});
