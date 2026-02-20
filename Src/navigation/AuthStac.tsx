import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../AuthScreens/LoginScreen";
import RegisterScreen from "../AuthScreens/RegisterScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
