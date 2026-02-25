import { View, Text, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { lightTheme, darkTheme } from "../../util/theme";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { clearCart, placeOrder } from "../../redux/authSlice";
import Success from "./Success";
const CheckOut = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { subTotal } = route.params;
  const profile = useSelector((state: RootState) => state.profile);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const cart = useSelector((state: RootState) => state.cart.items);
  const theme = themeMode === "light" ? lightTheme : darkTheme;
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          backgroundColor: theme.card,
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "green",
            paddingBottom: 8,
          }}
        >
          Shipping Info & Address
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 10, top: 10 }}
          onPress={() => navigation.navigate("Edits")}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#D96A00",
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            marginBottom: 20,
            borderColor: theme.text,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#D96A00" }}>
            {profile.name}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "700", color: theme.text }}>
            {profile.address}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "700", color: theme.text }}>
            {profile.phoneNumber}
          </Text>
          <Text style={{ fontSize: 15, color: theme.text }}>
            {profile.email}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            marginTop: 5,
            borderColor: theme.text,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#3B5BDB" }}>
            Payment Info
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 25,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="logo-paypal" color={"#5F9EA0"} size={20} />
              <Text style={{ color: theme.text }}>**** **** **** 1234</Text>
            </View>
            <Text style={{ color: theme.text }}>1/25</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: theme.card,
          padding: 10,
          margin: 10,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "700", color: "#D96A00" }}>
          Order Summary
        </Text>
        <View
          style={{
            borderWidth: 1,
            margin: 2,
            padding: 5,
            borderRadius: 5,
            borderColor: theme.text,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
              marginBottom: 5,
            }}
          >
            <Text
              style={{ fontSize: 22, fontWeight: "600", color: theme.text }}
            >
              Items:
            </Text>
            <Text
              style={{ fontSize: 22, fontWeight: "600", color: theme.text }}
            >
              ${subTotal.toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{ fontSize: 19, fontWeight: "400", color: theme.text }}
            >
              Delivery Fee:
            </Text>
            <Text
              style={{ fontSize: 19, fontWeight: "500", color: theme.text }}
            >
              +${Math.round(0.02 * subTotal.toFixed(2))}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#1E40AF" }}>
              Marketplace fee
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#1E40AF" }}>
              ${Math.round(0.01 * subTotal.toFixed(2))}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
              marginTop: 12,
            }}
          >
            <Text
              style={{ fontSize: 23, fontWeight: "600", color: theme.text }}
            >
              Total
            </Text>
            <Text
              style={{ fontSize: 23, fontWeight: "600", color: theme.text }}
            >
              ${Math.round(1.03 * subTotal.toFixed(2))}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ fontSize: 19, fontWeight: "400", color: "green" }}>
              Free Delivery
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "500", color: "green" }}>
              -${Math.round(0.02 * subTotal.toFixed(2))}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "700",
                marginTop: 15,
                marginBottom: 8,
                color: theme.text,
              }}
            >
              Order total
            </Text>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "700",
                marginTop: 15,
                marginBottom: 8,
                color: theme.text,
              }}
            >
              ${1.01 * Math.round(subTotal.toFixed(0))}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            margin: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#D96A00",
              padding: 14,
              borderRadius: 25,
              alignItems: "center",
              width: "70%",
              borderWidth: 3,
              borderColor: "#FFFFFF",
              marginBottom: 20,
            }}
            onPress={() => {
              dispatch(placeOrder(cartItems));
              dispatch(clearCart());
              navigation.navigate("Success");
            }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 18 }}>
              Submit Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default CheckOut;
