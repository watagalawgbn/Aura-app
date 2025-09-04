import { View, Text } from "react-native";
import styles from "../(tabs)/Assessment/AssessmentResultScreen.styles";
import React from "react";

const BreakdownCard = ({
  value,
  label,
  severity,
  color,
  accentBg,
}: {
  value: number;
  label: string;
  severity: string;
  color: string;
  accentBg: string;
}) => {
  return (
    <View style={[styles.card, { backgroundColor: "#fff" }]}>
      <Text style={[styles.cardScore, { color }]}>{value}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardSeverity}>{severity}</Text>
    </View>
  );
};

export default BreakdownCard;