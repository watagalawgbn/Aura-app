import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import styles from "./Profile.styles";
import { useAuth } from "../../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [isCurrentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Profile</Text>

      <View style={styles.avatar}>
        <Ionicons name="person" size={64} color="#80C29B" />
      </View>

      <TextInput
        style={styles.input}
        value={user?.name || ""}
        placeholder="Name"
        editable={true}
      />
      <TextInput
        style={styles.input}
        value={user?.email || ""}
        placeholder="Email"
        editable={false}
      />

      {/* Current Password */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Current password"
          secureTextEntry={!isCurrentPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setCurrentPasswordVisible(!isCurrentPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={isCurrentPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* New Password */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="New password"
          secureTextEntry={!isNewPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setNewPasswordVisible(!isNewPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={isNewPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry={!isConfirmPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={isConfirmPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          await logout();
          router.replace("/(auth)/SignIn");
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

