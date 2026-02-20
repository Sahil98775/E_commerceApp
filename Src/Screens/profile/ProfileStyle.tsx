import { StyleSheet } from "react-native";

const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profilefield: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "95%",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  photograph: {
    height: 250,
    width: "70%",
    borderRadius: 200,
    elevation: 20,
    shadowColor: "#D97A2B",
    borderWidth: 0,
    marginBottom: 10,
  },
  usertext: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },
  mailtext: {
    fontSize: 18,
    textAlign: "center",
    color: "#8E8E8E",
    marginBottom: 10,
  },
  listcontainer: {
    backgroundColor: "#FFFFFF",
    width: "95%",
    marginBottom: 50,
    padding: 10,
    borderRadius: 10,
  },
  liststyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: "#D97A2B",
  },
  liststyle1: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D97A2B",
  },
  liststyle2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  listtext: { fontSize: 22, fontWeight: "600", padding: 17 },
  lgout: {
    backgroundColor: "#E53935",
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
    width: "50%",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  lgoutext: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 18,
  },
});
export default profileStyle;
