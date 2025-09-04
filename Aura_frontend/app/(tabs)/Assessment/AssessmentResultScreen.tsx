import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import styles from "./AssessmentResultScreen.styles";
import MentalHealthDonutChart from "../../components/MentalHealthDonutChart";
import BreakdownCard from "@/app/components/BreakDownCard";
import ActionRow from "@/app/components/ActionRow";

export default function AssessmentResult() {
  const { scores, recommendations } = useLocalSearchParams();

  // Parse JSON params 
  const parsedScores = typeof scores === "string" ? JSON.parse(scores) : scores;
  const parsedRecs =
    typeof recommendations === "string"
      ? JSON.parse(recommendations)
      : recommendations;

  const phqScore = parsedScores.PHQ?.totalScore ?? 0;
  const phqSeverity = parsedScores.PHQ?.severity ?? "Minimal";
  const gadScore = parsedScores.GAD?.totalScore ?? 0;
  const gadSeverity = parsedScores.GAD?.severity ?? "Minimal";
  const dassScore = parsedScores.DASS?.totalScore ?? 0;
  const dassSeverity = parsedScores.DASS?.severity ?? "Normal";

  const data = [
    { score: Number(phqScore), color: "#e87674ff" }, // Mood
    { score: Number(gadScore), color: "#6592e5" }, // Anxiety
    { score: Number(dassScore), color: "#7bdb4bff" }, // Stress
  ];

  const totalScore = phqScore + gadScore + dassScore;
  const maxScore = 36;
  const overallPercent = Math.round((totalScore / maxScore) * 100);

  let status = "";
  let recommendationText = "";
  if (overallPercent <= 25) {
    status = "You're doing well!";
    recommendationText = "Keep practicing healthy habits.";
  } else if (overallPercent <= 50) {
    status = "You're experiencing some stress or low mood.";
    recommendationText =
      "Try daily self-care routines like mindfulness or breathing exercises.";
  } else if (overallPercent <= 75) {
    status = "You're showing signs of moderate emotional distress.";
    recommendationText =
      "Consider regular meditation or talking to a trusted friend or counselor.";
  } else {
    status = "You may be experiencing high mental stress.";
    recommendationText =
      "We strongly recommend speaking with a mental health professional.";
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Text style={styles.title}>Your Mental Health Result</Text>

      <MentalHealthDonutChart data={data} />

      {/* status blurb */}
      <View style={styles.feedbackBox}>
        <Text style={styles.statusText}>{status}</Text>
        <Text style={styles.recommendationText}>{recommendationText}</Text>
      </View>

      {/* ---------- Wellness Breakdown cards ---------- */}
      <Text style={styles.sectionHeader}>Wellness Breakdown</Text>
      <View style={styles.cardsRow}>
        <BreakdownCard
          value={phqScore}
          label="Depression"
          severity={phqSeverity}
          color="#e87674"
          accentBg="rgba(232,118,116,0.12)"
        />
        <BreakdownCard
          value={gadScore}
          label="Anxiety"
          severity={gadSeverity}
          color="#6592e5"
          accentBg="rgba(101,146,229,0.12)"
        />
        <BreakdownCard
          value={dassScore}
          label="Stress"
          severity={dassSeverity}
          color="#7bdb4b"
          accentBg="rgba(123,219,75,0.12)"
        />
      </View>

      {/* Recommended Actions - Only show if there are recommendations */}
      {(parsedRecs?.meditations?.length > 0 ||
        parsedRecs?.breathings?.length > 0) && (
        <>
          <Text style={styles.sectionHeader}>Small Steps Toward Balance</Text>

          {/* Meditations subsection */}
          {parsedRecs?.meditations?.length > 0 && (
            <>
              <Text style={styles.sectionSubheader}>Guided Meditations</Text>
              {parsedRecs.meditations.map((item: any) => (
                <ActionRow
                  key={item._id}
                  leftIconType="meditation"
                  title={item.title}
                  subtitle="Guided meditation"
                  ctaText="Start"
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/Meditation/PlayMeditationScreen",
                      params: {
                        title: item.title,
                        filename: item.filename,
                        imageId: item.image ?? null,
                      },
                    })
                  }
                />
              ))}
            </>
          )}

          {/* Breathing exercises subsection */}
          {parsedRecs?.breathings?.length > 0 && (
            <>
              <Text style={styles.sectionSubheader}>Breathing Exercises</Text>
              {parsedRecs.breathings.map((item: any) => (
                <ActionRow
                  key={item.title}
                  leftIconType="breathing"
                  title={item.title}
                  subtitle="Breathing exercise"
                  ctaText="Begin"
                  onPress={() =>
                    router.push({
                      pathname:
                        "/(tabs)/BreathingExercise/BreathingExerciseScreen",
                      params: { title: item.title, duration: item.duration },
                    })
                  }
                />
              ))}
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}
