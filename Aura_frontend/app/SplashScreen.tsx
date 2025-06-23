import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen() {
  return (
    <LinearGradient colors={["#5FB21F", "#224831"]} style={styles.container}>
      <Text style={styles.logo}>Aura</Text>
      <Text style={styles.subtext}>Start your mindful journey today</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#75FF33",
    fontFamily: "Cursive",
  },
  subtext: {
    fontSize: 18,
    color: "#fff",
    marginTop: 12,
    textAlign: "center",
  },
});
