import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import RatingStars from "../../Component/Rating";
import { Ionicons } from "@expo/vector-icons";
const ProductDetail = () => {
  const Route = useRoute();
  const { product } = Route.params as any;
  return (
    <View style={{ padding: 18 }}>
      <Ionicons
        name="share-social-outline"
        size={33}
        color={"#D97A2B"}
        style={{ position: "absolute", right: 10, top: 10 }}
      />
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
          }}
        >
          <Text
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
          marginBottom: 15,
        }}
      >
        <RatingStars rating={product.rating} />
        <Text>({product.reviews?.length || 0})</Text>
      </View>
      <Text style={{ fontSize: 17, fontFamily: "Inter-Regular" }}>
        {product.description}
      </Text>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 600, color: "green" }}>
          {product.availabilityStatus}
        </Text>
        <Text
          style={{
            color: product.stock < 10 ? "red" : "#333",
            fontWeight: product.stock < 10 ? "600" : "400",
          }}
        >
          Only {product.stock} left
        </Text>
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
          marginTop: 80,
          marginLeft: 70,
        }}
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
    </View>
  );
};
export default ProductDetail;
