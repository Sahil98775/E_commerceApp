import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  },
  homeText: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 28,
    fontWeight: "800",
    paddingBottom: 6,
  },
  categories: {
    width: "100%",
    padding: 5,
    borderStartEndRadius: 20,
    borderEndEndRadius: 20,
  },
  latest: {
    marginTop: 8,
    padding: 8,
    borderStartStartRadius: 20,
    borderEndStartRadius: 20,
  },
  allProduct: {
    padding: 8,
    borderRadius: 20,
  },
});
export default styles;
