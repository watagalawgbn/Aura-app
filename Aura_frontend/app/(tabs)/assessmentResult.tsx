// AssessmentResult.tsx

import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import MentalHealthDonutChart from "../components/MentalHealthDonutChart";
import { StatusBar } from "react-native";

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
    { score: Number(phqScore), color: "#EF5350" }, // Mood
    { score: Number(gadScore), color: "#42A5F5" }, // Anxiety
    { score: Number(dassScore), color: "#66BB6A" }, // Stress
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
          color="#EF5350"
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

const styles = StyleSheet.create({
  container: {
  flexGrow: 1,
  padding: 24,
  backgroundColor: "#fff",
  alignItems: "center",
  paddingBottom: 80,
  paddingTop: 50,
},

  title: {
    color: "#333",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  breakdown: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    color: "#666",
    fontSize: 16,
  },
  sectionHeader: {
    color: "#333",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#52AE77",
    padding: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  feedbackBox: {
    backgroundColor: "#F0F9F2",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    width: "100%",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  recommendationText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});
