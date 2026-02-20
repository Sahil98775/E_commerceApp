import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screens/Home/HomeScreen";
import CartScreen from "../Screens/Cart/CartScreen";
import WishListScreen from "../Screens/WishList/WishListScreen";
import ProfileScreen from "../Screens/profile/ProfileScreen";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { lightTheme, darkTheme } from "../util/theme";

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#E17600",
        tabBarInactiveTintColor: "#E6D2B8",
        headerStyle: {
          backgroundColor: theme.card,
        },
        headerTintColor: theme.text,
        tabBarStyle: {
          paddingTop: 7,
          height: 80,
          backgroundColor: theme.card,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" color={color} size={33} />
          ),
          // back: "#E6D2B8",
        }}
      />
      <Tab.Screen
        name="WishList"
        component={WishListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
