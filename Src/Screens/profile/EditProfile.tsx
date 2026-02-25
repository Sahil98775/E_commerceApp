import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../redux/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme, darkTheme } from "../../util/theme";
import * as ImagePicker from "expo-image-picker";

const Edits = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const profile = useSelector((state: RootState) => state.profile);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  const [name, setName] = useState(profile.name || "");
  const [email, setEmail] = useState(profile.email || "");
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || "");
  const [address, setAddress] = useState(profile.address || "");
  const [image, setImage] = useState<string | null>(profile.image || null);
  const [err, setErr] = useState("");

  // ----------------------------------------------------------

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // ----------------------------------------------------------

  const handleEdits = () => {
    setErr("");

    // Name validation
    if (!name.trim()) return setErr("Please Enter Name");
    if (name.length > 30) return setErr("Name too long");
    if (!/^[A-Za-z\s]+$/.test(name))
      return setErr("Only Alphabets are Permitted");

    // Email validation
    const emailregexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email.trim()) return setErr("Please Enter Email");
    if (!emailregexp.test(email)) return setErr("Please enter valid Email Id");

    // Phone validation (Indian)
    const indianPhoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    if (!phoneNumber.trim()) return setErr("Please Enter PhoneNumber");
    if (!indianPhoneRegex.test(phoneNumber))
      return setErr("Please Enter Valid PhoneNumber");

    // Address validation
    if (!address.trim()) return setErr("Please Enter Address");
    if (address.length > 100) return setErr("Address too long");

    dispatch(
      setProfile({
        name,
        email,
        phoneNumber,
        address,
        image,
      })
    );

    navigation.navigate("BottomTab", {
      screen: "Profile",
    });
  };

  // ----------------------------------------------------------

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        {/* Profile Image */}
        <View style={styles.profilepic}>
          <Image
            source={{
              uri:
                image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4GxnI2bOzOAQ9NpRvvHCkHQBXFQriXj8pgg&s",
            }}
            style={styles.image}
          />
          <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
            <Ionicons name="camera" color={"#DD7500"} size={40} />
          </TouchableOpacity>
        </View>

        {/* Inputs */}
        <TextInput
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          keyboardType="number-pad"
        />

        <Text style={styles.addText}>Address</Text>

        <TextInput
          placeholder="Address Details"
          value={address}
          onChangeText={setAddress}
          style={styles.inputArea}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.submitBut} onPress={handleEdits}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

        {err ? (
          <Text style={styles.error}>{err}</Text>
        ) : (
          <Text
            style={{
              color: theme.text,
              marginTop: 5,
            }}
          >
            Every Field is Mandatory*
          </Text>
        )}
      </View>
    </View>
  );
};

export default Edits;

// ----------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    borderRadius: 20,
    margin: 20,
    padding: 20,
    width: "95%",
    alignItems: "center",
  },
  profilepic: {
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
    borderRadius: 75,
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: "#F6D8B8",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  inputArea: {
    width: "100%",
    height: 120,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 16,
    textAlignVertical: "top",
    marginBottom: 30,
  },
  addText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#DD7500",
    fontWeight: "700",
    alignSelf: "flex-start",
  },
  submitBut: {
    backgroundColor: "#DD7500",
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
    width: "50%",
    marginBottom: 10,
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 18,
  },
  error: {
    color: "red",
    marginTop: 5,
  },
});
