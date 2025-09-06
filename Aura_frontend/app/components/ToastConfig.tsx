//app/components/Toast.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const ToastConfig = {
  success: ({ text1, text2 }: any) => (
    <View style={styles.container}>
      <Feather
        name="check-circle"
        size={20}
        color="#4CAF50"
        style={styles.icon}
      />
      <View>
        <Text style={styles.text1}>{text1}</Text>
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </View>
  ),
};

export default ToastConfig;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D1F2C8",
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    color: "#000000ff",
    fontSize: 15,
    fontWeight: "600",
  },
  message: {
    color: "#000000ff",
    fontSize: 13,
    marginTop: 2,
  },
  text1: { 
    flex: 1, 
    color: "#000000ff" 
  },
});
