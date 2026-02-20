import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const RegisterScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const registeredUsers = useSelector(
    (state: RootState) => state.auth.registeredUsers
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    setError("");

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!password) {
      setError("Password is required");
      return;
    }

    if (!strongPassword.test(password)) {
      setError(
        "Password must contain 8 characters, 1 uppercase, 1 lowercase, and 1 number"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const existingUser = registeredUsers.find(
      (user) => user.username === username
    );

    if (existingUser) {
      Alert.alert("Username already exists");
      return;
    }

    dispatch(register({ username, password }));

    navigation.navigate("Login");
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "flex-start",
        alignItems: "center",

        backgroundColor: "#FAFAFA",
      }}
    >
      <Image
        source={{
          uri: "https://cdn-icons-png.freepik.com/256/16939/16939342.png?semt=ais_white_label",
        }}
        style={{ height: 200, width: 200, margin: 15 }}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 60,
          color: "#3B82F6",
        }}
      >
        SIGN IN
      </Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 3,
          borderColor: "#E2E8F0",
          padding: 12,
          marginBottom: 25,
          borderRadius: 8,
          width: "100%",
        }}
      />

      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 3,
          borderColor: "#E2E8F0",
          padding: 12,
          marginBottom: 25,
          borderRadius: 8,
          width: "100%",
        }}
      />

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{
          borderWidth: 3,
          padding: 12,
          marginBottom: 80,
          borderRadius: 8,
          width: "100%",
          borderColor: "#E2E8F0",
        }}
      />

      {error ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "#43a400",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
          width: "50%",
          borderWidth: 3,
          borderColor: "#FFFFFF",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "700" }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
