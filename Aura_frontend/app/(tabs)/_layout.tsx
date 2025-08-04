//(tabs)/_layout.tsx

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Slot, router, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TabsLayout = () => {
  const segments = useSegments();
  const current = segments[segments.length - 1];
  const isActive = (name: string) => current?.toLowerCase() === name.toLowerCase();

  return (
    <View style={styles.container2}>
      <Slot />
      <View style={styles.borderWrapper}>
        <View style={styles.container}>
          {/* Home */}
          <TouchableOpacity
            onPress={() => router.navigate("/(tabs)/Home/Home")}
            style={styles.itemsCenter}
          >
            <Ionicons
              name="home-outline"
              size={24}
              color={isActive("Home") ? "#224831" : "#52AE77"}
            />
            <Text style={{ color: isActive("Home") ? "#224831" : "#52AE77" }}>Home</Text>
          </TouchableOpacity>

          {/* Meditation */}
          <TouchableOpacity
            onPress={() => router.navigate("/(tabs)/Meditation")}
            style={styles.itemsCenter}
          >
            <Image
              source={require("../../assets/images/lotus.png")}
              style={[
                styles.iconImage,
                { tintColor: isActive("Meditation") ? "#224831" : "#52AE77" },
              ]}
            />
            <Text style={{ color: isActive("Meditation") ? "#224831" : "#52AE77" }}>
              Meditation
            </Text>
          </TouchableOpacity>

          {/* Quick Access */}
          <TouchableOpacity
            onPress={() => router.navigate("/(tabs)/QuickAccess")}
            style={styles.itemsCenter}
          >
            <MaterialCommunityIcons
              name="widgets-outline"
              size={24}
              color={isActive("QuickAccess") ? "#224831" : "#52AE77"}
            />
            <Text style={{ color: isActive("QuickAccess") ? "#224831" : "#52AE77" }}>
              Quick Access
            </Text>
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity
            onPress={() => router.navigate("/(tabs)/Profile")}
            style={styles.itemsCenter}
          >
            <Ionicons
              name="person-outline"
              size={24}
              color={isActive("Profile") ? "#224831" : "#52AE77"}
            />
            <Text style={{ color: isActive("Profile") ? "#224831" : "#52AE77" }}>
              Profile
            </Text>
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
    // backgroundColor: "#52AE77",
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
  iconImage: {
    width: 28, 
    height: 28, 
    marginBottom: 5, 
  },
});
