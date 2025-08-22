//components/BackButton.tsx

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

type BackButtonProps = {
  title: string;
};

const BackButton = ({ title }: BackButtonProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <View style={styles.circle}>
          <Feather name="arrow-left" size={20} color="black" />
        </View>
      </TouchableOpacity>

      <View style={styles.titleWrapper}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <TouchableOpacity>
        <Feather name="more-vertical" size={24} color="#52AE77" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#52AE77",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
  },
  titleWrapper: {
    marginTop: 65,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default BackButton;
