import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme, darkTheme } from "../../util/theme";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const CartScreen = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Ionicons name="file-tray-full-outline" size={100} color={"#D97A2B"} />
      <Text style={{ fontSize: 20, textAlign: "center", color: theme.text }}>
        No items in WishList
      </Text>
    </View>
  );
};
export default CartScreen;
