import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
export const profileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userAvatar: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  userOverview: {
    backgroundColor: Colors.light.tabIconDefault,
    height: 100,
    width: "100%",
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  userInfo: {
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfoName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfoEmail: {
    fontSize: 16,
    color: "#fff",
  },
});
