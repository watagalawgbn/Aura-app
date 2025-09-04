import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../(tabs)/Assessment/AssessmentResultScreen.styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const ActionRow = ({
  leftIconType,
  title,
  subtitle,
  ctaText,
  onPress,
}: {
  leftIconType: "meditation" | "breathing";
  title: string;
  subtitle: string;
  ctaText: string;
  onPress: () => void;
}) => {
  const isBreathing = leftIconType === "breathing";

  return (
    <View style={styles.actionRow}>
      <View
        style={[
          styles.actionIconWrap,
          isBreathing ? styles.actionIconWrapBreath : null,
        ]}
      >
        {isBreathing ? (
          <MaterialCommunityIcons
            name="weather-windy"
            size={24}
            color="#4CAF50"
          />
        ) : (
          <Ionicons name="musical-notes" size={24} color="#4CAF50" />
        )}
      </View>

      <View style={styles.actionTextWrap}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>

      <TouchableOpacity style={styles.ctaBtn} onPress={onPress}>
        <Text style={styles.ctaBtnText}>{ctaText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionRow;