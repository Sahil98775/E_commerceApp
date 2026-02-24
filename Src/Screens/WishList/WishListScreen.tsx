import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleFavourite } from "../../redux/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme, darkTheme } from "../../util/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Product = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  description: string;
  rating: number;
  stock: number;
  availabilityStatus: string;
  weight: number;
};
type RootStackParamList = {
  ProductDetail: { product: Product };
};
const WishlistScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourite.items);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;
  const cart = useSelector((state: RootState) => state.cart.items);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      {favourites.length === 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Ionicons
            name="file-tray-full-outline"
            size={100}
            color={"#D97A2B"}
          />
          <Text
            style={{ fontSize: 20, textAlign: "center", color: theme.text }}
          >
            No items in WishList
          </Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: theme.card,
                padding: 10,
                marginVertical: 5,
                borderRadius: 10,
                elevation: 3,
              }}
              onPress={() =>
                navigation.navigate("ProductDetail", { product: item })
              }
            >
              <View>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Remove Favourite",
                      "Do you want to remove this item from favourites?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Remove",
                          style: "destructive",
                          onPress: () => dispatch(toggleFavourite(item)),
                        },
                      ]
                    )
                  }
                  // onPress={() => dispatch(toggleFavourite(item))}
                  style={{ position: "relative" }}
                >
                  <Ionicons name="trash" size={24} color="#D97A2B" />
                </TouchableOpacity>

                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: 180, height: 200, resizeMode: "contain" }}
                />
              </View>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  width: "53%",
                  padding: 5,
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{ fontSize: 24, fontWeight: "600", color: "#D97A2B" }}
                >
                  {item.title}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{ fontWeight: "500", color: theme.text }}
                >
                  {item.description}
                </Text>
                <Text
                  style={{ fontSize: 30, fontWeight: "500", color: theme.text }}
                >
                  ${item.price}
                </Text>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: "500",
                    backgroundColor: "red",
                    padding: 3,
                    borderRadius: 5,
                  }}
                >
                  {item.discountPercentage}% OFF
                </Text>

                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 20,
                    fontWeight: 600,
                    color: item.stock === 0 ? "red" : "green",
                  }}
                >
                  {item.availabilityStatus}
                </Text>
                {item.stock > 0 && (
                  <Text
                    style={{
                      color: item.stock < 10 ? "red" : "#333",
                      fontWeight: item.stock < 10 ? "600" : "400",
                    }}
                  >
                    Only {item.stock} left
                  </Text>
                )}

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    width: "100%",
                    padding: 5,
                    borderRadius: 8,
                    backgroundColor: "#D97A2B",
                    borderColor: "#FFFFFF",
                    marginTop: 10,
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      marginRight: 7,
                      color: "#FFFFFF",
                    }}
                  >
                    Add to Cart
                  </Text>
                  <Ionicons name="cart" color={"#ffffff"} size={23} />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#c23b22",
                  position: "absolute",
                  marginTop: 10,
                  bottom: 4,
                  left: 8,
                }}
              >
                *{item.shippingInformation}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default WishlistScreen;
