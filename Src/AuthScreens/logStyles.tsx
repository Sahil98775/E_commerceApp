import { StyleSheet } from "react-native";

const logStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE0BD",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  user: {
    width: "100%",
    height: 55,
    backgroundColor: "#F5F2ED",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  passward: {
    width: "100%",
    height: 55,
    backgroundColor: "#F5F2ED",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  log: {
    width: "100%",
    height: 55,
    backgroundColor: "#DD7500",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
});

export default logStyles;
