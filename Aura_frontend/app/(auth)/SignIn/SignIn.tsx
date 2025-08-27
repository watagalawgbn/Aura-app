//app/(auth)/SignIn.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import styles from "./SignIn.styles";
import { useRouter } from "expo-router";
import axios from "axios";
import { SignInRequest, AuthResponse } from "../../../types/auth";
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
      console.log("Tokennn:", token);

      alert("Signed in successfully");
      router.replace("/(tabs)/Home/HomeScreen");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Sign in failed. Try again.";
      alert(message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff"/>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../../assets/images/aura.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Log in to your account</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={18}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            placeholder="Your Email Address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <TextInput
            placeholder="Your password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/(auth)/ForgotPassword")}>
          <View style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => {
            // TODO: google login
          }}
        >
          <View style={styles.googleContent}>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000",
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
          <Text
            style={styles.link}
            onPress={() => router.push("/(auth)/SignUp/SignUp")}
          >
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



export default SignIn;
