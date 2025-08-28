import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import styles from "./AssessmentResultScreen.styles";
import MentalHealthDonutChart from "../../components/MentalHealthDonutChart";

export default function AssessmentResult() {
  const { scores, recommendations } = useLocalSearchParams();

  // Parse JSON params
  const parsedScores = typeof scores === "string" ? JSON.parse(scores) : scores;
  const parsedRecs = typeof recommendations === "string" ? JSON.parse(recommendations) : recommendations;

  const phqScore = parsedScores.PHQ?.totalScore ?? 0;
  const phqSeverity = parsedScores.PHQ?.severity ?? "Minimal";
  const gadScore = parsedScores.GAD?.totalScore ?? 0;
  const gadSeverity = parsedScores.GAD?.severity ?? "Minimal";
  const dassScore = parsedScores.DASS?.totalScore ?? 0;
  const dassSeverity = parsedScores.DASS?.severity ?? "Normal";

  const data = [
    { score: Number(phqScore), color: "#e87674ff" }, // Mood
    { score: Number(gadScore), color: "#6592e5" },   // Anxiety
    { score: Number(dassScore), color: "#7bdb4bff" },// Stress
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
    recommendationText = "Try daily self-care routines like mindfulness or breathing exercises.";
  } else if (overallPercent <= 75) {
    status = "You're showing signs of moderate emotional distress.";
    recommendationText = "Consider regular meditation or talking to a trusted friend or counselor.";
  } else {
    status = "You may be experiencing high mental stress.";
    recommendationText = "We strongly recommend speaking with a mental health professional.";
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Text style={styles.title}>Your Mental Health Result</Text>
      <MentalHealthDonutChart data={data} />

      <View style={styles.feedbackBox}>
        <Text style={styles.statusText}>{status}</Text>
        <Text style={styles.recommendationText}>{recommendationText}</Text>
      </View>

      <View style={styles.breakdown}>
        <DetailItem label="Mood" score={phqScore} severity={phqSeverity} color="#e87674ff" />
        <DetailItem label="Anxiety" score={gadScore} severity={gadSeverity} color="#42A5F5" />
        <DetailItem label="Stress" score={dassScore} severity={dassSeverity} color="#66BB6A" />
      </View>

      {/* ✅ Recommended Meditations */}
      {parsedRecs?.meditations?.length > 0 && (
        <>
          <Text style={styles.sectionHeader}>Recommended Meditations</Text>
          {parsedRecs.meditations.map((item: any) => (
            <TouchableOpacity
              key={item._id}
              style={styles.button}
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
            >
              <Text style={styles.buttonText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      {/* ✅ Recommended Breathing Exercises */}
      {parsedRecs?.breathings?.length > 0 && (
        <>
          <Text style={styles.sectionHeader}>Recommended Breathing Exercises</Text>
          {parsedRecs.breathings.map((item: any) => (
            <TouchableOpacity
              key={item.title}
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/BreathingExercise/BreathingExerciseScreen", // 👈 you’ll make this screen
                  params: {
                    title: item.title,
                    duration: item.duration,
                  },
                })
              }
            >
              <Text style={styles.buttonText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const DetailItem = ({ label, score, severity, color }: any) => (
  <View style={styles.item}>
    <Text style={[styles.label, { color }]}>{label}</Text>
    <Text style={styles.info}>
      {score} ({severity})
    </Text>
  </View>
);
