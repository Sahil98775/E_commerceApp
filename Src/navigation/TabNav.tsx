import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screens/Home/HomeScreen";
import CartScreen from "../Screens/Cart/CartScreen";
import WishListScreen from "../Screens/WishList/WishListScreen";
import ProfileScreen from "../Screens/profile/ProfileScreen";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { lightTheme, darkTheme } from "../util/theme";
import { View, Text } from "react-native";
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;
  const favourites = useSelector((state: RootState) => state.favourite.items);
  const cart = useSelector((state: RootState) => state.cart.items);
  const wishlistCount = favourites.length;
  const cartCount = cart.length;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#E17600",
        tabBarInactiveTintColor: "#E6D2B8",
        headerStyle: {
          backgroundColor: theme.header,
        },
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: "700",
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
          headerTitle: () => (
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
                Fastket
              </Text>
              <Ionicons
                name="rocket"
                size={28}
                color="#DD7500"
                style={{ marginRight: 6 }}
              />
            </View>
          ),
          headerTitleAlign: "center",

          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitle: () => (
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
                MyCart
              </Text>
              <Ionicons
                name="cart"
                size={32}
                color="#DD7500"
                style={{ marginRight: 6 }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <View style={{ width: 30, height: 30 }}>
              <Ionicons name="cart" color={color} size={30} />

              {cartCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -10,
                    backgroundColor: "red",
                    borderRadius: 10,
                    minWidth: 18,
                    height: 18,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </Text>
                </View>
              )}
            </View>
          ),
          // back: "#E6D2B8",
        }}
      />
      <Tab.Screen
        name="WishList"
        component={WishListScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 32,
                  fontFamily: "Poppins-Bold",
                  fontWeight: "700",
                  color: theme.text,
                }}
              >
                MyWishList
              </Text>
              <Ionicons
                name="heart"
                size={32}
                color="#DD7500"
                style={{ marginRight: 6 }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <View style={{ width: 30, height: 30 }}>
              <Ionicons name="heart" color={color} size={30} />

              {wishlistCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -10,
                    backgroundColor: "red",
                    borderRadius: 10,
                    minWidth: 18,
                    height: 18,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 32,
                  fontFamily: "Poppins-Bold",
                  fontWeight: "700",
                  color: theme.text,
                }}
              >
                MyProfile
              </Text>
              <Ionicons
                name="person"
                size={32}
                color="#DD7500"
                style={{ marginRight: 6 }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
