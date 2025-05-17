// components/MentalHealthDonutChart.tsx

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { G, Circle } from "react-native-svg";


const RADIUS = 90; // radius
const STROKE = 20; // thickness
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // perimeter 
const SIZE = (RADIUS + STROKE) * 2; 

const MentalHealthDonutChart = ({ data }: {
  data: { score: number; color: string }[];
}) => {
  // Calculate the total score to determine percentage per segment
  const total = data.reduce((sum, s) => sum + s.score, 0);
  let offset = 0; // control where each segment starts

  return (
    <View style={styles.wrapper}>
      <Svg width={SIZE} height={SIZE}>
        {/* Group all arcs and rotate the starting point to top (12 o'clock) */}
        <G rotation="-90" origin={`${SIZE / 2}, ${SIZE / 2}`}>
          {data.map((item, index) => {
            const dash = (item.score / total) * CIRCUMFERENCE;

            const circle = (
              <Circle
                key={index}
                cx={SIZE / 2} // center X
                cy={SIZE / 2} // center Y
                r={RADIUS} 
                stroke={item.color} 
                strokeWidth={STROKE} 
                strokeDasharray={`${dash} ${CIRCUMFERENCE}`} // length + space
                strokeDashoffset={-offset}
                strokeLinecap="round" 
                fill="transparent" 
              />
            );

            offset += dash; // update offset for next arc
            return circle;
          })}
        </G>
      </Svg>

      <View style={styles.centerTextWrapper}>
        <Text style={styles.mainPercent}>{Math.round((total / 36) * 100)}%</Text>
        <Text style={styles.subLabel}>Overall Score</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  centerTextWrapper: {
    position: "absolute", 
    alignItems: "center",
    justifyContent: "center",
  },
  mainPercent: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subLabel: {
    fontSize: 14,
    color: "#888",
  },
});

export default MentalHealthDonutChart;
