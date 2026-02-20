import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import logStyles from "./logStyles";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassward] = useState("");
  const [showPassward, setShowPassward] = useState(false);
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const registeredUsers = useSelector(
    (state: RootState) => state.auth.registeredUsers
  );
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const handleLogin = () => {
    setUserError("");
    setPasswordError("");

    if (!username.trim()) {
      setUserError("UserName is Required");
      return;
    }

    if (username.length < 3) {
      setUserError("INVALID USERNAME");
      return;
    }
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    if (!usernameRegex.test(username)) {
      setUserError("INVAID USERNAME");
      return;
    }

    if (!password) {
      setPasswordError("Passward is required");
      return;
    }
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!strongPassword.test(password)) {
      setPasswordError("INVALID PASSWORD");
      return;
    }
    if (registeredUsers.length === 0) {
      setUserError("No user found. Please register first.");
      return;
    }
    const matchedUser = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      dispatch(login({ username: matchedUser.username }));
    } else {
      setPasswordError("Invalid username or password");
    }
  };

  return (
    <View style={logStyles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/295/295128.png",
        }}
        style={{ height: 200, width: 200, margin: 120 }}
      />
      <TextInput
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setUserError("");
        }}
        style={logStyles.user}
        placeholder="UserName"
      />
      {userError ? <Text style={{ color: "red" }}>{userError}</Text> : null}
      <View
        style={{
          flexDirection: "row",
          position: "relative",
          width: "100%",
          alignItems: "center",
          paddingTop: 25,
        }}
      >
        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassward(text);
            setPasswordError("");
          }}
          style={logStyles.passward}
          placeholder="Passward"
          secureTextEntry={!showPassward}
        />
        <Ionicons
          name={showPassward ? "eye" : "eye-off"}
          size={20}
          color="grey"
          onPress={() => setShowPassward(!showPassward)}
          style={{ right: 30 }}
        />
      </View>
      {passwordError ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{passwordError}</Text>
      ) : null}
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            color: "#24A0ED",
            margin: 10,
            fontSize: 16,
            fontWeight: "400",
            paddingBottom: 50,
          }}
        >
          forget Passward?
        </Text>
      </View>
      <TouchableOpacity style={logStyles.log} onPress={handleLogin}>
        <Text style={{ fontSize: 20, color: "#FFFFFF" }}>LogIn</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={{
            color: "#24A0ED",
            fontSize: 18,
            fontWeight: "400",
            padding: 10,
          }}
          onPress={() => navigation.navigate("Register")}
        >
          Register?
        </Text>
      </TouchableOpacity>

      {registeredUsers.map((user, index) => (
        <Text key={index}>
          {user.username} - {user.password}
        </Text>
      ))}
    </View>
  );
};
export default LoginScreen;
