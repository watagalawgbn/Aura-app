import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router"; // ✅ Expo Router hook
import { AuthRequest, AuthResponse } from "../../types/auth";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // ✅ Expo Router navigation

  const handleSignIn = async () => {
    const payload: AuthRequest = { email, password };

    try {
      const res = await axios.post<AuthResponse>(
        "http://192.168.8.188:3000/api/auth/signin",
        payload
      );
      Alert.alert("Signed in successfully", res.data.token);
      router.replace("/screens/home"); // or wherever your home screen is
    } catch (error) {
      Alert.alert("Error", "Invalid credentials or server error.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Text onPress={() => router.push("/(auth)/SignUp")} style={styles.link}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  link: { color: "blue", marginTop: 10 },
});

export default SignIn;
