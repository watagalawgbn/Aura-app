import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import styles from "./Home.styles";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import MoodLog from "../Mood/Mood";
import { useAuth } from "../../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { getGreeting } from "@/utils/getGreeting";

const HomeScreen = () => {
  const router = useRouter();
  const [isMoodLogVisible, setIsMoodLogVisible] = useState(false); //handle mood state
  const { user } = useAuth();

  const currentTime = new Date();
  const greetingMessage = getGreeting(currentTime); //get greeting message based on the time of the day

  const formattedDate = currentTime.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#224831" barStyle="light-content" />

      {/* Header section of the home screen */}
      <LinearGradient
        colors={["#224831", "#5FB21F"]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/aura.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.greeting}>{greetingMessage},</Text>
            <Text style={styles.greeting}>{user?.name ?? "User"}!</Text>
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
              onPress={() => router.push("/(tabs)/Assessment/Assessment")}
            >
              <Text style={styles.insightCardTitle}>
                Mental Health Assessment
              </Text>
              <Image
                source={require("../../../assets/images/quiz.png")}
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
                source={require("../../../assets/images/mood.png")}
                style={styles.insightCardImage}
              />
            </TouchableOpacity>
            {isMoodLogVisible && (
              <MoodLog isVisible onClose={() => setIsMoodLogVisible(false)} />
            )}

            {/*Sleep tracking card*/}
            <TouchableOpacity
              style={styles.insightCard}
              onPress={() => router.push("/(tabs)/SleepScreen/SleepBetterScreen")}
            >
              <Text style={styles.insightCardTitle}>Track your sleep</Text>
              <Image
                source={require("../../../assets/images/sleep.png")}
                style={styles.insightCardImage}
              />
            </TouchableOpacity>
          </ScrollView>

          {/*Quick Access section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/QuickAccess/QuickAccess")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Meditation card */}
          <View style={styles.quickAccessContainer}>
            <TouchableOpacity style={styles.quickAccessItem}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../../assets/images/stress.jpg")}
                  style={styles.quickAccessImage}
                />
              </View>
              <View style={styles.quickAccessContent}>
                <Text style={styles.quickAccessTitle}>
                  Stress-Free Meditation
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/Meditation/Meditation")}
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

            {/* Job card */}
            <TouchableOpacity style={styles.quickAccessItem}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../../assets/images/earning.jpg")}
                  style={styles.quickAccessImage}
                />
              </View>
              <View style={styles.quickAccessContent}>
                <Text style={styles.quickAccessTitle}>Boost Your Earnings</Text>
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/JobScreen/JobScreen")}
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

export default HomeScreen;
