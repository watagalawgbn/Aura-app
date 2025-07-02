import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import MoodLog from "./Mood";
import { useAuth } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = () => {
  const [isMoodLogVisible, setIsMoodLogVisible] = useState(false);
  const { user } = useAuth();

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greetingMessage = "";
  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greetingMessage = "Good Afternoon";
  } else if (currentHour >= 17 && currentHour < 21) {
    greetingMessage = "Good Evening";
  } else {
    greetingMessage = "Good to see you Again";
  }

  const currentDate = currentTime.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#224831" barStyle="light-content" />

      <LinearGradient
        colors={["#224831", "#5FB21F"]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/aura.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.date}>{currentDate}</Text>
            <Text style={styles.greeting}>{greetingMessage},</Text>
            <Text style={styles.greeting}>{user?.name}!</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Feather name="bell" size={24} color="black" border="1" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Curved Content Container */}
        <View style={styles.curvedContentContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Insights</Text>
          </View>

          <ScrollView
            horizontal
            style={styles.insightsContainer}
            contentContainerStyle={styles.insightsContent}
            showsHorizontalScrollIndicator={false}
          >
            {/* Mental Health Assessment Card */}
            <TouchableOpacity
              style={styles.insightCard}
              onPress={() => router.navigate("/(tabs)/Assessment")}
            >
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
              onPress={() => setIsMoodLogVisible(true)}
              style={styles.insightCard}
            >
              <Text style={styles.insightCardTitle}>Track your mood</Text>
              <Image
                source={require("../../assets/images/mood.png")}
                style={styles.insightCardImage}
              />
            </TouchableOpacity>
            {isMoodLogVisible && (
              <MoodLog isVisible onClose={() => setIsMoodLogVisible(false)} />
            )}

            {/*Sleep tracking */}
            <TouchableOpacity
              style={styles.insightCard}
              onPress={() => router.navigate("/(tabs)/Assessment")}
            >
              <Text style={styles.insightCardTitle}>Track you sleep</Text>
              <Image
                source={require("../../assets/images/sleep.png")}
                style={styles.insightCardImage}
              />
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            <TouchableOpacity
              onPress={() => router.navigate("/(tabs)/QuickAccess")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickAccessContainer}>
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
                  onPress={() => router.navigate("/(tabs)/Meditation")}
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
                  onPress={() => router.navigate("/(tabs)/QuickAccess")}
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
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    // marginRight: 20,
  },
  greetingContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    marginVertical: 5,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
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
    flexGrow: 1,
    paddingBottom: 30,
  },
  curvedContentContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 15,
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
    color: "#52AE77",
  },
  insightsContainer: {
    flexDirection: "row",
    width: "100%",
  },
  insightCard: {
  width: 200, // fixed width for better horizontal scrolling
  backgroundColor: "white",
  borderRadius: 25,
  padding: 15,
  marginRight: 15, // adds space between cards
  borderWidth: 1,
  borderColor: "#eee",
  justifyContent: "space-between",
  height: 250,
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
insightsContent: {
  paddingLeft: 10,
  paddingRight: 10,
}
,
  insightCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
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
    elevation: 3,
    shadowColor: "#000",
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
    backgroundColor: "#5FB21F",
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
