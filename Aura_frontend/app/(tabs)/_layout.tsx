// app/(tabs)/_layout.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Slot, router, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TabsLayout = () => {
  return (
    <View style={styles.container2}>
      <Slot />
      <View style={styles.borderWrapper}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.navigate("/(tabs)/home")} style={styles.itemsCenter}>
            <Ionicons name="home" size={24} color="#52AE77" />
            <Text style={{ color: "#52AE77" }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.navigate("/(tabs)/meditation")} style={styles.itemsCenter}>
            <MaterialCommunityIcons name="meditation" size={28} color="#52AE77" />
            <Text style={{ color: "#52AE77" }}>Meditation</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.navigate("/(tabs)/quickAccess")} style={styles.itemsCenter}>
            <MaterialCommunityIcons name="widgets-outline" size={24} color="#52AE77" />
            <Text style={{ color: "#52AE77" }}>Quick Access</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.navigate("/(tabs)/profile")} style={styles.itemsCenter}>
            <Ionicons name="person-outline" size={24} color="#52AE77" />
            <Text style={{ color: "#52AE77" }}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TabsLayout;


const styles = StyleSheet.create({
    container: {
      height: 60,
      width: "100%",
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
    },
    borderWrapper: {
      position: "absolute",
      bottom: 0,
      height: 60,
      width: "100%",
      backgroundColor: "#52AE77",
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      padding: 1,
    },
    container2: {
      position: "relative",
      height: "100%",
      width: "100%",
    },
    itemsCenter: {
      alignItems: "center",
    },
  });
  