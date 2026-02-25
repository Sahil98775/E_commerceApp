import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import BottomTab from "./TabNav";
import Settings from "../Screens/profile/Settings";
import Edits from "../Screens/profile/EditProfile";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { lightTheme, darkTheme } from "../util/theme";
import ProductDetail from "../Screens/Product/ProductDetails";
import CheckOut from "../Screens/Cart/CheckOut";
import Success from "../Screens/Cart/Success";
import MyOrder from "../Screens/profile/MyOrder";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.backcolor },
        headerTintColor: theme.text,
      }}
    >
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edits" component={Edits} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen
        name="Check"
        component={CheckOut}
        options={{
          headerTitle: () => (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    fontFamily: "Poppins-Bold",
                    fontWeight: "700",
                    color: theme.text,
                  }}
                >
                  Checkout
                </Text>
                <Ionicons
                  name="bag-check"
                  size={32}
                  color="#DD7500"
                  style={{ marginRight: 6 }}
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingBottom: 20,
                  marginTop: 10,
                }}
              >
                <Ionicons name="checkmark-circle" color={"#D96A00"} size={22} />
                <Text
                  style={{ fontSize: 19, fontWeight: "600", color: theme.text }}
                >
                  MyCart
                </Text>
                <Ionicons
                  name="arrow-forward"
                  color={"black"}
                  size={20}
                  style={{ padding: 3 }}
                />
                <Ionicons name="checkmark-circle" color={"#D96A00"} size={22} />
                <Text
                  style={{ fontSize: 19, fontWeight: "600", color: theme.text }}
                >
                  Payment
                </Text>
                <Ionicons
                  name="arrow-forward"
                  color={"black"}
                  size={20}
                  style={{ padding: 3 }}
                />
                <Ionicons name="checkmark-circle" color={"grey"} size={22} />
                <Text
                  style={{ fontSize: 19, fontWeight: "600", color: theme.text }}
                >
                  Review
                </Text>
              </View>
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
