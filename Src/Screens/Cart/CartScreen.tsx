import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme, darkTheme } from "../../util/theme";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  decrementCart,
  incrementCart,
  removeFromCart,
} from "../../redux/authSlice";
import { useNavigation } from "@react-navigation/native";
const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;
  const cart = useSelector((state: RootState) => state.cart.items);

  const subTotal = cart.reduce((acc, items) => {
    return acc + items.price * items.quantity;
  }, 0);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: theme.background,
        padding: 2,
      }}
    >
      {cart.length === 0 ? (
        <View style={{ alignItems: "center" }}>
          <Ionicons
            name="file-tray-full-outline"
            size={100}
            color={"#D97A2B"}
          />
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: theme.text,
              marginTop: 10,
            }}
          >
            Cart Is Empty
          </Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  padding: 12,
                  borderBottomWidth: 1,
                  marginVertical: 1,
                }}
              >
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: 100, height: 120, resizeMode: "contain" }}
                />
                <View
                  style={{
                    marginLeft: 5,
                    width: "74%",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 21,
                        fontWeight: "800",
                        color: theme.text,
                        width: "75%",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        paddingRight: 1,
                        fontWeight: "600",
                        color: "#DD7500",
                      }}
                    >
                      ${Math.ceil(item.subPrice)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "grey",
                    }}
                  >
                    ${item.price}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "700",
                        color: "#D97A2B",
                        paddingRight: 2,
                      }}
                    >
                      Qty:
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: theme.text,
                      }}
                    >
                      {item.quantity}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        position: "absolute",
                        right: 0,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => dispatch(incrementCart(item))}
                      >
                        <Ionicons
                          name="add-circle"
                          color={"#D97A2B"}
                          size={27}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: "600",
                          padding: 3,
                          color: theme.text,
                        }}
                      >
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => dispatch(decrementCart(item.id))}
                      >
                        <Ionicons
                          name="remove-circle"
                          color={"#D97A2B"}
                          size={27}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{ marginTop: 10 }}
                    onPress={() => dispatch(removeFromCart(item.id))}
                  >
                    <Text
                      style={{ color: "grey", fontSize: 16, fontWeight: "400" }}
                    >
                      remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View
            style={{
              backgroundColor: theme.card,
              padding: 12,
              borderStartStartRadius: 15,
              borderEndStartRadius: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 10,
                marginBottom: 12,
              }}
            >
              <Text
                style={{ fontSize: 21, fontWeight: "700", color: theme.text }}
              >
                SubTotal:
              </Text>

              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: theme.text,
                  marginRight: 10,
                }}
              >
                ${subTotal.toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  width: "70%",
                  padding: 13,
                  borderRadius: 10,
                  backgroundColor: "#D96A00",
                  borderColor: "#FFFFFF",
                }}
                onPress={() => navigation.navigate("Check", { subTotal })}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    marginRight: 7,
                    color: "#FFFFFF",
                  }}
                >
                  Proceed to buy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
export default CartScreen;
