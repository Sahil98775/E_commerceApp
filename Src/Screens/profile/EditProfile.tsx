import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootState, store } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../redux/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme, darkTheme } from "../../util/theme";

import * as ImagePicker from "expo-image-picker";

const Edits = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [err, setErr] = useState("");

  const navigation = useNavigation<any>();

  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === "light" ? lightTheme : darkTheme;
  //------------------------------------------------------------------------------
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

  const handleEdits = () => {
    setErr("");

    if (!name.trim()) {
      setErr("Please Enter Name");
      return;
    }
    if (!email.trim()) {
      setErr("Please Enter the Email");
      return;
    }
    if (!phoneNumber.trim()) {
      setErr("Please Enter the PhoneNumber");
      return;
    }
    if (!address.trim()) {
      setErr("Please Enter the Address");
      return;
    }
    if (name.length > 30) {
      setErr("You have Exceeded the Spacelimit");
    }

    const nameregexp = /^[A-Za-z]/;
    if (!nameregexp.test(name)) {
      setErr("Only Alphabets are Permitted");
    }

    const emailregexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailregexp.test(email)) {
      setErr("Please enter the valid Email Id");
    }

    const indianPhoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(phoneNumber)) {
      setErr("Please Enter the Valid PhoneNumber");
    }

    if (address.length > 50) {
      setErr("You Have Exceeded the Spacelimit");
    }

    dispatch(setProfile({ name, email, phoneNumber, address, image }));
    navigation.navigate("BottomTab", {
      screen: "Profile",
    });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          backgroundColor: theme.card,
          borderRadius: 20,
          margin: 20,
          padding: 20,
          width: "95%",
          alignItems: "center",
        }}
      >
        <View style={styles.profilepic}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 75,
              }}
            />
          ) : (
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4GxnI2bOzOAQ9NpRvvHCkHQBXFQriXj8pgg&s",
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 75,
              }}
            />
            // <Ionicons name="person" size={80} color="#DD7500" />
          )}
          <TouchableOpacity
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onPress={pickImage}
          >
            <Ionicons name="camera" color={"#DD7500"} size={45} />
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder={profile.name ?? "Your Name"}
          value={name}
          onChangeText={setName}
          style={styles.Textput}
        ></TextInput>

        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.Textput}
          placeholder={profile.email ?? "email"}
        ></TextInput>

        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.Textput}
          placeholder={profile.phoneNumber ?? "PhoneNumber"}
        ></TextInput>

        <Text style={styles.addText}>Address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={styles.Textput1}
          placeholder={profile.address ?? "Address Details"}
          multiline={true}
          numberOfLines={4}
        ></TextInput>

        <TouchableOpacity style={styles.submitBut} onPress={handleEdits}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

        {err ? (
          <Text style={{ color: "red", marginLeft: 10 }}>{err}</Text>
        ) : (
          <Text style={{ color: theme.text, marginLeft: 10 }}>
            Every Block is Compulsary*
          </Text>
        )}
      </View>
    </View>
  );
};
export default Edits;

const styles = StyleSheet.create({
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

  Textput: {
    width: "100%",
    height: 55,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 10,
    shadowColor: "#DD7500",
    shadowRadius: 4,
    marginBottom: 25,
  },
  Textput1: {
    width: "100%",
    height: 120,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,

    textAlignVertical: "top",
    paddingTop: 15, //multiline ke liye

    fontSize: 16,
    elevation: 10,
    shadowColor: "#DD7500",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 50,
  },
  addText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#DD7500",
    fontWeight: "800",
    paddingLeft: 5,
  },
  submitBut: {
    backgroundColor: "#DD7500",
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
    width: "50%",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    marginBottom: 20,
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 18,
  },
});

// photograph: {
//     height: 250,
//     width: "70%",
//     borderRadius: 200,
//     elevation: 20,
//     shadowColor: "#D97A2B",
//     borderWidth: 0,
//     marginBottom: 10,
//   },
