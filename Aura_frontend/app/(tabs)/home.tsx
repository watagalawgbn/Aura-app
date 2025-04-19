import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Button,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import MoodLog from "./mood";
import { useAuth } from "../../context/AuthContext";

const HomeScreen = () => {
  const [isMoodLogVisible, setMoodLogVisible] = useState(false);
  const { user } = useAuth();


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header Background */}
      <Image
        source={require("../../assets/images/bg.jpg")}
        style={styles.headerBackground}
      />

      {/* Header Content */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.greeting}>Hello {user?.name || "there"} !</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Feather name="bell" size={24} color="#52AE77" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="menu" size={20} color="#52AE77" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#52AE77"
          />
          <TouchableOpacity>
            <Feather name="search" size={20} color="#52AE77" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Curved Content Container */}
        <View style={styles.curvedContentContainer}>
          {/* My Insights Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Insights</Text>
          </View>

          <View style={styles.insightsContainer}>
            {/* Mental Health Assessment Card */}
            <TouchableOpacity style={styles.insightCard}>
              <Text style={styles.insightCardTitle}>
                Mental Health Assessment
              </Text>
              <Image
                source={require("../../assets/images/quiz.png")}
                style={styles.insightCardImage}
              />
            </TouchableOpacity>

            {/* Track your mood Card */}
            <TouchableOpacity
              onPress={() => setMoodLogVisible(true)} // Trigger the modal
              style={styles.insightCard}
            >
              <Text style={styles.insightCardTitle}>Track your mood</Text>
              <Image
                source={require("../../assets/images/mood.png")}
                style={styles.insightCardImage}
              />
            </TouchableOpacity>
            {/* Modal Trigger */}
            {isMoodLogVisible && (
              <MoodLog isVisible onClose={() => setMoodLogVisible(false)} />
            )}
          </View>

          {/* Quick Access Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            <TouchableOpacity onPress={() => router.navigate("/(tabs)/quickAccess")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Access Items */}
          <View style={styles.quickAccessContainer}>
            {/* Stress-Free Meditation Item */}
            <TouchableOpacity style={styles.quickAccessItem}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../assets/images/stress.jpg")}
                  style={styles.quickAccessImage}
                />
              </View>
              <View style={styles.quickAccessContent}>
                <Text style={styles.quickAccessTitle}>
                  Stress-Free Meditation
                </Text>
                <TouchableOpacity
                  onPress={() => router.navigate("/(tabs)/quickAccess")}
                  style={styles.exploreButton}
                >
                  <Text style={styles.exploreButtonText}>Explore</Text>
                  <Feather
                    name="arrow-right"
                    size={14}
                    color="white"
                    style={styles.buttonIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* Boost Your Earnings Item */}
            <TouchableOpacity style={styles.quickAccessItem}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../assets/images/earning.jpg")}
                  style={styles.quickAccessImage}
                />
              </View>
              <View style={styles.quickAccessContent}>
                <Text style={styles.quickAccessTitle}>Boost Your Earnings</Text>
                <TouchableOpacity
                  onPress={() => router.navigate("/(tabs)/quickAccess")}
                  style={styles.exploreButton}
                >
                  <Text style={styles.exploreButtonText}>Explore</Text>
                  <Feather
                    name="arrow-right"
                    size={14}
                    color="white"
                    style={styles.buttonIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ paddingBottom: 20 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "35%",
    width: "100%",
    opacity: 0.9,
  },
  header: {
    paddingTop: 30,
    paddingHorizontal: 20,
    zIndex: 1, // header stays above content
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 75,
    height: 60,
    borderRadius: 20,
    marginRight: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  notificationIcon: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1, //content takes up space as needed for scrolling
    paddingBottom: 30
  },
  curvedContentContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 15,
    flex: 1, // Take up remaining space
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    fontSize: 16,
    color: "#666",
  },
  insightsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  insightCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    justifyContent: "space-between",
    height: 250, // Shadow for Android
    elevation: 5, // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  insightCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    maxWidth: "90%",
  },
  insightCardImage: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  quickAccessContainer: {
    marginBottom: 20,
  },
  quickAccessItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 10,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 120,
  },
  imageContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 10,
  },
  quickAccessImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  quickAccessContent: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  exploreButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  exploreButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 5,
  },
  buttonIcon: {
    marginLeft: 3,
  },
});

export default HomeScreen;
