import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Ionicons } from "@expo/vector-icons";
import { toggleTheme } from "../../redux/authSlice";
const Settings = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: theme === "light" ? "#F5F2ED" : "#12110F",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: theme === "light" ? "#ffffff" : "#222222",
          margin: 7,
          width: "98%",
          padding: 15,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        onPress={() => dispatch(toggleTheme())}
      >
        <Text
          style={{
            color: theme === "light" ? "#000" : "#ffffff",
            fontSize: 30,
            fontWeight: "600",
          }}
        >
          {theme}
        </Text>
        <Ionicons
          name={theme === "light" ? "sunny-sharp" : "moon-sharp"}
          color={"yellow"}
          size={35}
          style={{ position: "absolute", right: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Settings;
