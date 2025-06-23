// app/(auth)/ForgotPassword.tsx

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from "@/constants/Api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSendResetLink = async () => {
    try {
      await axios.post(`${BASE_URL}/api/auth/forgot-password`, { email });
      Alert.alert("Check your email for reset instructions.");
    } catch (err: any) {
      Alert.alert("Error", err?.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Forgot Password
      </Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />
      <TouchableOpacity
        onPress={handleSendResetLink}
        style={{
          backgroundColor: "#4CAF50",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
}
