import { StyleSheet } from "react-native";

export const predictImageScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  result: {
    fontSize: 24,
    fontWeight: "bold",
  },
  questionContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  question: {
    fontSize: 24,
    marginBottom: 40,
  },
  questionOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 250,
  },
  foodNameForm: {
    alignItems: "center",
    marginVertical: 20,
  },
  input: {
    padding: 10,
    width: 250,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    width: "90%",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
