import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={
            rating >= star
              ? "star"
              : rating >= star - 0.5
              ? "star-half"
              : "star-outline"
          }
          size={18}
          color="#FFC107"
        />
      ))}
    </View>
  );
};
export default RatingStars;
