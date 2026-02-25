import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { lightTheme, darkTheme } from "../../util/theme";

const MyOrders = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  if (orders.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <Text style={{ fontSize: 20, color: theme.text }}>No Orders Yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: theme.background }}
      data={[...orders].reverse()}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            backgroundColor: theme.card,
            margin: 10,
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: "#D97A2B",
            }}
          >
            Order ID: {item.id}
          </Text>

          <Text style={{ fontSize: 18, color: theme.text, marginTop: 5 }}>
            Items: {item.items.length}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "600", color: "green" }}>
              Total:
            </Text>
            <Text style={{ fontSize: 20, color: theme.text }}>
              ${item.totalAmount.toFixed(2)}
            </Text>
          </View>

          <Text style={{ fontSize: 16, color: "grey", marginTop: 5 }}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
      )}
    />
  );
};

export default MyOrders;
