import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import RatingStars from "../../Component/Rating";
import { Ionicons } from "@expo/vector-icons";
import { addToCart, toggleFavourite } from "../../redux/authSlice";
import { lightTheme, darkTheme } from "../../util/theme";

const ProductDetail = () => {
  const Route = useRoute();
  const { product } = Route.params as any;
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourite.items);
  const isFavourite = favourites.some((fav) => fav.id === product.id);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <ScrollView style={{ padding: 18, backgroundColor: theme.background }}>
      <TouchableOpacity
        onPress={() => dispatch(toggleFavourite(product))}
        style={{ position: "relative", left: "90%" }}
      >
        <Ionicons
          name={isFavourite ? "heart" : "heart-outline"}
          size={30}
          color={isFavourite ? "#D97A2B" : "grey"}
        />
      </TouchableOpacity>
      <Image
        source={{ uri: product.thumbnail }}
        style={{ width: "100%", height: 400, resizeMode: "contain" }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            width: "60%",
          }}
        >
          <Text
            numberOfLines={3}
            style={{
              fontSize: 25,
              fontWeight: "600",
              marginBottom: 10,
              color: "#D97A2B",
            }}
          >
            {product.title}
          </Text>
        </View>

        <View style={{ position: "absolute", right: 0 }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "700",
              fontFamily: "Poppins-Bold",
              color: theme.text,
            }}
          >
            ${product.price}
          </Text>
          <Text style={{ color: "red" }}>
            <Ionicons name="pricetags-outline" color={"red"} size={15} />
            {product.discountPercentage}% OFF
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
          marginBottom: 7,
        }}
      >
        <RatingStars rating={product.rating} />
        <Text style={{ color: theme.text }}>
          ({product.reviews?.length || 0})
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          color: "#60A5FA",
          marginBottom: 5,
        }}
      >
        *{product.warrantyInformation}
      </Text>
      <Text
        style={{ fontSize: 17, fontFamily: "Inter-Regular", color: theme.text }}
      >
        {product.description}
      </Text>

      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: product.stock > 0 ? "green" : "red",
          }}
        >
          {product.availabilityStatus}
        </Text>
        {product.stock > 0 && (
          <Text
            style={{
              color: product.stock < 10 ? "red" : "#333",
              fontWeight: product.stock < 10 ? "600" : "400",
            }}
          >
            Only {product.stock} left
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          width: "60%",
          padding: 15,
          borderRadius: 10,
          backgroundColor: "#D97A2B",
          borderColor: "#FFFFFF",
          marginTop: 20,
          marginLeft: 70,
        }}
        onPress={() =>
          dispatch(
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
              availabilityStatus: product.availabilityStatus,
              warrantyInformation: product.warrantyInformation,
              shippingInformation: product.shippingInformation,
              quantity: 1,
              subPrice: product.price,
            })
          )
        }
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginRight: 7,
            color: "#FFFFFF",
          }}
        >
          Add To Cart
        </Text>
        <Ionicons name="cart" color={"#ffffff"} size={23} />
      </TouchableOpacity>
    </ScrollView>
  );
};
export default ProductDetail;
