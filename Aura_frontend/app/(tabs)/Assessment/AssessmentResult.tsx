// AssessmentResult.tsx

import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import styles from "./AssessmentResult.styles";
import MentalHealthDonutChart from "../../components/MentalHealthDonutChart";

export default function AssessmentResult() {
  // Get parameters from the navigation (sent after submitting the assessment)
  const {
    phqScore,
    phqSeverity,
    gadScore,
    gadSeverity,
    dassScore,
    dassSeverity,
  } = useLocalSearchParams();

  // scores and assign colors to each category for the chart
  const data = [
    { score: Number(phqScore), color: "#e87674ff" }, // Mood
    { score: Number(gadScore), color: "#6592e5" }, // Anxiety
    { score: Number(dassScore), color: "#7bdb4bff" }, // Stress
  ];

  
  const totalScore = Number(phqScore) + Number(gadScore) + Number(dassScore);
  const maxScore = 36; 
  const overallPercent = Math.round((totalScore / maxScore) * 100);

  let status = "";
  let recommendation = "";

  if (overallPercent <= 25) {
    status = "You're doing well!";
    recommendation = "Keep practicing healthy habits.";
  } else if (overallPercent <= 50) {
    status = "You're experiencing some stress or low mood.";
    recommendation =
      "Try daily self-care routines like mindfulness or breathing exercises.";
  } else if (overallPercent <= 75) {
    status = "You're showing signs of moderate emotional distress.";
    recommendation =
      "Consider regular meditation or talking to a trusted friend or counselor.";
  } else {
    status = "You may be experiencing high mental stress.";
    recommendation =
      "We strongly recommend speaking with a mental health professional.";
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Text style={styles.title}>Your Mental Health Result</Text>

      <MentalHealthDonutChart data={data} />

      <View style={styles.feedbackBox}>
        <Text style={styles.statusText}>{status}</Text>
        <Text style={styles.recommendationText}>{recommendation}</Text>
      </View>

      <View style={styles.breakdown}>
        <DetailItem
          label="Mood"
          score={phqScore}
          severity={phqSeverity}
          color="#e87674ff"
        />
        <DetailItem
          label="Anxiety"
          score={gadScore}
          severity={gadSeverity}
          color="#42A5F5"
        />
        <DetailItem
          label="Stress"
          score={dassScore}
          severity={dassSeverity}
          color="#66BB6A"
        />
      </View>

      <Text style={styles.sectionHeader}>What Can You Do?</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Try a Guided Meditation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Try a Breathing Exercise</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// show individual score items (e.g., Mood: 7 (Moderate))
const DetailItem = ({ label, score, severity, color }: any) => (
  <View style={styles.item}>
    <Text style={[styles.label, { color }]}>{label}</Text>
    <Text style={styles.info}>
      {score} ({severity})
    </Text>
  </View>
);
