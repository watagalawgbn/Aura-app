//app/(auth)/SignIn.tsx
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { SignInRequest, AuthResponse } from "../../types/auth";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { BASE_URL } from "@/constants/Api";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignUp = async () => {
    const payload: SignInRequest = { email, password };

    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }    
    
    try {
      const res = await axios.post<AuthResponse>(
        `${BASE_URL}/api/auth/signin`,
        payload
      );

      const token = res.data.token;
      await login(token);
      
      alert("Signed in successfully");
      router.replace("/(tabs)/home");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Sign in failed. Try again.";
      alert(message);
    }    
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")} 
        style={styles.logo}
      />
      <Text style={styles.title}>Log in to your account</Text>

      <View style={styles.inputContainer}>
      <Ionicons name="mail-outline" size={18} color="#888" style={styles.icon} />
      <TextInput
          placeholder="Your Email Address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
      <Ionicons name="lock-closed" size={20} color="#888" style={styles.icon} />
      <TextInput
          placeholder="Your password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
        <Ionicons
          name={isPasswordVisible ? "eye-off" : "eye"} // Change icon based on state
          size={20}
          color="#888"
        />
      </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.googleButton} onPress={() => { /* Handle Google login */ }}>
  <View style={styles.googleContent}>
    <Image
      source={{
        uri: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000',
      }}
      style={styles.googleIcon}
    />
    <Text style={styles.googleText}>Sign in with Google</Text>
  </View>
</TouchableOpacity>


      <TouchableOpacity onPress={handleSignUp} style={styles.mainButton}>
        <Text style={styles.mainButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Don't have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/(auth)/SignUp")}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: 100, height: 80, marginBottom: 20, borderRadius: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    width: "100%",
  },
  icon: { marginRight: 10 },
  input: { flex: 1 },
  googleButton: {
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  googleText: { color: "#333" },
  mainButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  googleContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },  
  mainButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  footer: { marginTop: 10 },
  link: { color: "#4CAF50", fontWeight: "500" },
});


export default SignIn;
