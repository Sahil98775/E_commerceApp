import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../AuthScreens/LoginScreen";
import RegisterScreen from "../AuthScreens/RegisterScreen";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#FFE0BD" } }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "Poppins-Bold",
                  fontWeight: "700",
                  paddingRight: 30,
                }}
              >
                Registration
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
