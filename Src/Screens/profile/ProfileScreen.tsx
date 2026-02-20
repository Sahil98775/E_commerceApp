import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import profileStyle from "./ProfileStyle";
import { lightTheme, darkTheme } from "../../util/theme";
import { RootState } from "../../redux/store";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const profile = useSelector((state: RootState) => state.profile);

  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("LoginScreen");
  };
  return (
    <View
      style={[profileStyle.container, { backgroundColor: theme.background }]}
    >
      <View
        style={[profileStyle.profilefield, { backgroundColor: theme.card }]}
      >
        <TouchableOpacity
          style={{ position: "absolute", right: 8, top: 8 }}
          onPress={() => navigation.navigate("Edits")}
        >
          <Ionicons name="pencil" color={"#D97A2B"} size={25} />
        </TouchableOpacity>

        <Image
          source={{
            uri: profile.image
              ? profile.image
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWhULjIQ5LEbQR5lPMC37wU8zWGUVPJ57eQA&s",
          }}
          style={profileStyle.photograph}
        />
        <Text style={[profileStyle.usertext, { color: theme.text }]}>
          {profile.name || "UserName"}
        </Text>
        <Text style={[profileStyle.mailtext, { color: theme.text }]}>
          {profile.email || "Username@gmail.com"}
        </Text>
      </View>

      <View
        style={[profileStyle.listcontainer, { backgroundColor: theme.card }]}
      >
        <TouchableOpacity style={profileStyle.liststyle}>
          <Ionicons name="checkbox" color={"#D97A2B"} size={30} />
          <Text style={[profileStyle.listtext, { color: theme.text }]}>
            My Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={profileStyle.liststyle1}>
          <Ionicons name="heart" color={"#D97A2B"} size={30} />
          <Text style={[profileStyle.listtext, { color: theme.text }]}>
            My Wishlist
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={profileStyle.liststyle2}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings" color={"#D97A2B"} size={30} />
          <Text style={[profileStyle.listtext, { color: theme.text }]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={profileStyle.lgout} onPress={handleLogout}>
        <Text style={profileStyle.lgoutext}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;
