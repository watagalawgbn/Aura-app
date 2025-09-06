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
import { SignInRequest } from "../../../types/auth";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { signIn } from "@/app/services/authService";
import Toast from "react-native-toast-message";

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
      Toast.show({
        type: "error",
        text1: "Missing Fields ⚠️",
        text2: "All fields are required.",
        visibilityTime: 5000,
        position: "top",
        autoHide: true,
      });
      return;
    }

    if (!email.includes("@")) {
      Toast.show({
        type: "error",
        text1: "Invalid Email Address ⚠️",
        text2: "Please enter a valid email address.",
        visibilityTime: 5000,
        position: "top",
        autoHide: true,
      });
      return;
    }

    try {
      const res = await signIn(payload);
      await login(res.token);
      Toast.show({
        type: "success",
        text1: "Success🎉",
        text2: `Welcome back 👋`,
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
      });
      router.replace("/(tabs)/Home/HomeScreen");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error ⚠️",
        text2: error?.message || "Something went wrong. Please try again.",
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
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

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}

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
