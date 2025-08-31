import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Pressable,
} from "react-native";
import styles from "./QuickAccessScreen.styles";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import BackButton from "../../components/BackButton";

type CardProps = {
  image: any;
  title: string;
  subtitle: string;
  onPress: () => void;
};

const FeatureCard = ({ image, title, subtitle, onPress }: CardProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.halfCard, pressed && styles.cardPressed]}
  >
    {({ hovered, pressed }) => {
      const active = hovered || pressed;
      return (
        <>
          <Image source={image} style={styles.cardImage} />

          {/* Title + phrase (bottom-left) */}
          <View style={styles.textWrap}>
            <Text style={styles.cardTitleBig} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.cardSubtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          </View>

          {/* Dim + centered play icon on hover/press */}
          {active && (
            <View style={styles.overlay}>
              <View style={styles.playPill}>
                <Feather name="play" size={28} color="#52AE77" />
              </View>
            </View>
          )}
        </>
      );
    }}
  </Pressable>
);

const QuickAccessScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <BackButton title={"Self Care"} />

      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View style={styles.rowContainer}>
          <FeatureCard
            image={require("../../../assets/images/stress.jpg")}
            title="Meditation"
            subtitle={"Guided sessions for inner calm"}
            onPress={() => router.navigate("/(tabs)/Meditation/MeditationScreen")}
          />
          <FeatureCard
            image={require("../../../assets/images/calm.jpeg")}
            title="Breathing"
            subtitle={"Mindful breathing to relax"}
            onPress={() =>
              router.navigate("/(tabs)/BreathingExercise/BreathingExerciseScreen")
            }
          />
        </View>

        <View style={styles.rowContainer}>
          <FeatureCard
            image={require("../../../assets/images/study.jpg")}
            title="Focus Timer"
            subtitle={"Boost focus with timed sessions"}
            onPress={() =>
              router.navigate("/(tabs)/PomodoroScreen/PomodoroScreen")
            }
          />
          <FeatureCard
            image={require("../../../assets/images/earning.jpg")}
            title="Career Growth"
            subtitle={"Find roles that fit your goals"}
            onPress={() => router.navigate("/(tabs)/JobScreen/JobScreen")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuickAccessScreen;
