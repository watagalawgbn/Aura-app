import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { AuthRequest, AuthResponse } from "../../types/auth";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    const payload: AuthRequest = { email, password };

    try {
      const res = await axios.post<AuthResponse>(
        "http://http://192.168.8.188:3000/api/auth/signup",
        payload
      );
      Alert.alert("Signed up successfully", res.data.token);
      router.replace("/(auth)/SignIn");
    } catch (error) {
      Alert.alert("Error", "Could not sign up. Try again.");
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text onPress={() => router.push("/(auth)/SignIn")} style={styles.link}>
        Already have an account? Sign In
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  link: { color: "blue", marginTop: 10 },
});

export default SignUp;
