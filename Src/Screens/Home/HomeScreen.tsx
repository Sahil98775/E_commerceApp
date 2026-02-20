import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";

import styles from "./homeStyle";
import { lightTheme, darkTheme } from "../../util/theme";
import {
  getAllProduct,
  getCategories,
  getProductsByCategory,
  getLatestProducts,
} from "../../util/ProductsApi";
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

interface Category {
  slug: string;
  name: string;
  url: string;
}
type RootStackParamList = {
  ProductDetail: { product: Product };
};
const HomeScreen = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [latestProduct, setLatestProduct] = useState<Product[]>([]);

  const handleCategoryPress = async (slug: string) => {
    try {
      setLoading(true);
      const data = await getProductsByCategory(slug);
      setProducts(data);
    } catch (error) {
      console.log("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    //------------------------------------------------------------------

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log("Error fetching categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();

    //------------------------------------------------------------------
    const handleLatestProducts = async () => {
      try {
        const data = await getLatestProducts();
        setLatestProduct(data);
      } catch (err) {
        console.log("unable to fetch latest product", err);
      } finally {
        setLoading(false);
      }
    };
    handleLatestProducts();

    //------------------------------------------------------------------
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <View style={[styles.categories, { backgroundColor: theme.card }]}>
        <Text style={[styles.homeText, { color: theme.text }]}>categories</Text>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.slug}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  paddingBottom: 12,
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    padding: 5,
                    margin: 5,
                    borderRadius: 10,
                  }}
                  onPress={() => handleCategoryPress(item.slug)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>

      <View style={[styles.latest, { backgroundColor: theme.card }]}>
        <Text style={[styles.homeText, { color: theme.text }]}>
          Latest Product
        </Text>
        <FlatList
          data={latestProduct}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  padding: 10,
                  margin: 10,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  elevation: 3,
                }}
              >
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{
                    width: "100%",
                    height: 150,
                    resizeMode: "contain",
                  }}
                />
                <Text>{item.title}</Text>
                <Text>${item.price}</Text>
                <Text>{item.discountPercentage}% OFF</Text>
              </View>
            );
          }}
        ></FlatList>
      </View>
      <View style={[styles.allProduct, { backgroundColor: theme.card }]}>
        <Text style={[styles.homeText, { color: theme.text }]}>
          All Product
        </Text>
        <FlatList
          key="two-columns"
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 8,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flex: 1,
                margin: 6,
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 10,
                elevation: 3,
              }}
              onPress={() =>
                navigation.navigate("ProductDetail", { product: item })
              }
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={{
                  width: "100%",
                  height: 150,
                  resizeMode: "contain",
                }}
              />
              <Text numberOfLines={2} style={{ fontWeight: "600" }}>
                {item.title}
              </Text>

              <Text>${item.price}</Text>
              <Text style={{ color: "red" }}>
                {item.discountPercentage}% OFF
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
