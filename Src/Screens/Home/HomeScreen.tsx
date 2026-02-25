import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "./homeStyle";
import { lightTheme, darkTheme } from "../../util/theme";
import {
  getAllProduct,
  getCategories,
  getProductsByCategory,
  getLatestProducts,
} from "../../util/ProductsApi";
import { addToCart, toggleCart, toggleFavourite } from "../../redux/authSlice";
import { Product } from "../../util/productype";

interface Category {
  slug: string;
  name: string;
  url: string;
}
type RootStackParamList = {
  ProductDetail: { product: Product };
};
const HomeScreen = () => {
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourite.items);
  const cart = useSelector((state: RootState) => state.cart.items);
  const favouriteIds = new Set(favourites.map((item) => item.id));
  const cartIds = new Set(cart.map((item) => item.id));

  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [latestProduct, setLatestProduct] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryPress = async (slug: string) => {
    try {
      setLoading(true);
      const data = await getProductsByCategory(slug);
      setProducts(data);
      setSelectedCategory(slug);
    } catch (error) {
      console.log("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsData, categoriesData, latestData] = await Promise.all([
          getAllProduct(),
          getCategories(),
          getLatestProducts(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
        setLatestProduct(latestData);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <View style={[styles.categories, { backgroundColor: theme.backcolor }]}>
        <Text style={[styles.homeText, { color: theme.text }]}>Categories</Text>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.slug}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item.slug;
            return (
              <View
                style={{
                  paddingBottom: 12,
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    padding: 8,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "#FFFFFF",
                    backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                  }}
                  onPress={() => handleCategoryPress(item.slug)}
                >
                  <Text
                    style={{
                      color: theme.cat,
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>

      <View style={[styles.latest, { backgroundColor: theme.background }]}>
        <Text
          style={[styles.homeText, { color: "#D97A2B", paddingHorizontal: 2 }]}
        >
          Newly added products
        </Text>

        <FlatList
          data={latestProduct}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const isFavourite = favouriteIds.has(item.id);
            const isCart = cartIds.has(item.id);
            return (
              <TouchableOpacity
                style={{
                  padding: 10,
                  margin: 10,
                  backgroundColor: theme.card,
                  borderRadius: 10,
                  elevation: 3,
                }}
                onPress={() =>
                  navigation.navigate("ProductDetail", { product: item })
                }
              >
                <TouchableOpacity
                  onPress={() => dispatch(toggleFavourite(item))}
                >
                  <Ionicons
                    name={isFavourite ? "heart" : "heart-outline"}
                    size={25}
                    color={isFavourite ? "#D97A2B" : "grey"}
                    style={{
                      position: "relative",
                      left: "80%",
                    }}
                  />
                </TouchableOpacity>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{
                    width: "100%",
                    height: 150,
                    resizeMode: "contain",
                  }}
                />

                <Text
                  style={{ fontSize: 15, fontWeight: "600", color: "#D97A2B" }}
                >
                  {item.title}
                </Text>
                <Text style={{ fontWeight: "600", color: theme.text }}>
                  ${item.price}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 4,
                  }}
                >
                  <Text style={{ color: "red", fontWeight: "700" }}>
                    {item.discountPercentage}% OFF
                  </Text>
                  <TouchableOpacity onPress={() => dispatch(toggleCart(item))}>
                    <Ionicons
                      name={isCart ? "checkbox" : "cart"}
                      color={"#D97A2B"}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={[styles.allProduct, { backgroundColor: theme.product }]}>
        <Text style={[styles.homeText, { color: theme.text }]}>
          {selectedCategory}
        </Text>
        <FlatList
          key="two-columns"
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 1,
          }}
          renderItem={({ item }) => {
            const isFavourite = favouriteIds.has(item.id);
            const isCart = cartIds.has(item.id);
            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                  margin: 6,
                  backgroundColor: theme.card,
                  borderRadius: 10,
                  padding: 10,
                  elevation: 3,
                }}
                onPress={() =>
                  navigation.navigate("ProductDetail", { product: item })
                }
              >
                <TouchableOpacity
                  onPress={() => dispatch(toggleFavourite(item))}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    zIndex: 1,
                  }}
                >
                  <Ionicons
                    name={isFavourite ? "heart" : "heart-outline"}
                    size={25}
                    color={isFavourite ? "#D97A2B" : "grey"}
                  />
                </TouchableOpacity>

                <Image
                  source={{ uri: item.thumbnail }}
                  style={{
                    width: "100%",
                    height: 150,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  numberOfLines={2}
                  style={{
                    fontWeight: "600",
                    fontSize: 18,
                    marginBottom: 2,
                    color: theme.text,
                  }}
                >
                  {item.title}
                </Text>

                <Text style={{ fontSize: 15, marginBottom: 2, color: "grey" }}>
                  ${item.price}
                </Text>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontWeight: "600",
                    backgroundColor: "red",
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 5,
                    marginTop: 6,
                    alignSelf: "flex-start",
                  }}
                >
                  {item.discountPercentage}% OFF
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    width: "100%",
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: "#D97A2B",
                    borderColor: "#FFFFFF",
                    marginTop: 15,
                  }}
                  onPress={() => dispatch(toggleCart(item))}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      marginRight: 7,
                      color: "#FFFFFF",
                    }}
                  >
                    {isCart ? null : "Cart"}
                  </Text>
                  <Ionicons
                    name={isCart ? "checkmark" : "cart"}
                    color={"#ffffff"}
                    size={23}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
