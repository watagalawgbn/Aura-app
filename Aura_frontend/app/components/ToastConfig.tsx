// src/components/toastConfig.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <View style={styles.container}>
      <Feather
        name="check-circle"
        size={20}
        color="#4CAF50"
        style={styles.icon}
      />
      <View>
        <Text style={styles.title}>{text1}</Text>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </View>
  ),

  error: ({ text1, text2 }: any) => (
    <View style={[styles.container, { backgroundColor: "#1C1C1E" }]}>
      <Feather name="x-circle" size={20} color="#E53935" style={styles.icon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{text1}</Text>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </View>
  ),
};

export default toastConfig;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "center",
    alignSelf: "center", 
    maxWidth: "90%", 
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#1C1C1E",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  message: {
    color: "#D0D0D0",
    fontSize: 13,
    marginTop: 2,
    textAlign: "center",
  },
});
