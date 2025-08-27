import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import dayjs from "dayjs";
import { SleepChartProps } from "@/types/sleep";

const SleepChart: React.FC<SleepChartProps> = ({
  selectedDate,
  sleepRecords,
}) => {
  console.log("Selected date:", selectedDate);

  const dayOfWeek = dayjs(selectedDate).day(); // 0 = Sunday
  const startOfWeek = dayjs(selectedDate).subtract((dayOfWeek + 6) % 7, "day");

  const data = [...Array(7)].map((_, i) => {
    const date = startOfWeek.clone().add(i, "day").format("YYYY-MM-DD");
    const record = sleepRecords.find((r) => r.date === date);
    console.log(`🔍 Checking date: ${date}`, record);

    return {
      value: record?.duration ?? 0,
      label: dayjs(date).format("ddd"),
      frontColor: "#4CAF50",
      spacing: 20,
    };
  });

  return (
    <View style={{ padding: 16, backgroundColor: "#fff", borderRadius: 12 }}>
      <Text style={{ textAlign: "center", marginBottom: 20 }}>
        Sleep Data for Week Starting: {startOfWeek.format("MMMM D, YYYY")}
      </Text>
      <BarChart
        data={data}
        barWidth={22}
        spacing={12}
        barBorderRadius={5}
        maxValue={15} // controls the Y-axis max
        noOfSections={5}
        yAxisLabelSuffix="h"
        yAxisTextStyle={{ color: "#888", fontSize: 12 }}
        xAxisLabelTextStyle={{ color: "#444", fontSize: 12 }}
        yAxisThickness={1}
        xAxisThickness={1}
        // showGradient
        showLine={false}
        // yAxisLabelTexts={['0', '3', '6', '9', '12', '15']}
      />
      {data.every((item) => item.value === 0) && (
        <Text style={{ textAlign: "center", color: "orange", marginTop: 10 }}>
          No sleep data for this week yet.
        </Text>
      )}
    </View>
  );
};

export default SleepChart;
