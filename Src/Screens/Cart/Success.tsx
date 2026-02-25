import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const Success = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0, //Index batata hai kaunsi screen active hai.
        routes: [{ name: "BottomTab" }], //Is array me sirf 1 screen hai → uska index 0 hoga.
      });
    }, 1000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D96A00",
      }}
    >
      <Ionicons name="checkmark-circle" color={"#FFFFFF"} size={75} />
      <Text style={{ fontSize: 30, fontWeight: "600", color: "#FFFFFF" }}>
        Order is placed
      </Text>
    </View>
  );
};
export default Success;
