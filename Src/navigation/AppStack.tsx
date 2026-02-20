import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./TabNav";
import Settings from "../Screens/profile/Settings";
import Edits from "../Screens/profile/EditProfile";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { lightTheme, darkTheme } from "../util/theme";
import ProductDetail from "../Screens/Product/ProductDetails";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.text,
      }}
    >
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Edits" component={Edits} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default AppStack;
