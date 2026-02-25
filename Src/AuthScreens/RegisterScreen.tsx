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
import { Ionicons } from "@expo/vector-icons";

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
        padding: 40,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFE0BD",
      }}
    >
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Ionicons name="rocket" size={120} color={"#D96A00"} />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 60,
            color: "#000000",
          }}
        >
          SIGN IN
        </Text>
      </View>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          borderColor: "#E2E8F0",
          padding: 12,
          marginBottom: 25,
          borderRadius: 8,
          width: "100%",
          backgroundColor: "#F5F2ED",
          elevation: 3,
          marginTop: 10,
        }}
      />

      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "#E2E8F0",
          padding: 12,
          marginBottom: 25,
          borderRadius: 8,
          width: "100%",
          backgroundColor: "#F5F2ED",
          elevation: 3,
        }}
      />

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 80,
          borderRadius: 8,
          width: "100%",
          borderColor: "#E2E8F0",
          backgroundColor: "#F5F2ED",
          elevation: 3,
        }}
      />

      {error ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "#DD7500",
          padding: 15,
          borderRadius: 18,
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
