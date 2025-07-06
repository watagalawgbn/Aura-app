import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import dayjs from "dayjs";

type SleepRecord = {
  date: string;
  duration: number;
};

type SleepChartProps = {
  selectedDate: string | Date;
  sleepRecords: SleepRecord[];
};

const SleepChart: React.FC<SleepChartProps> = ({
  selectedDate,
  sleepRecords,
}) => {
  console.log("Received sleepRecords:", sleepRecords);
  console.log("Selected date:", selectedDate);

  const startOfWeek = dayjs(selectedDate).startOf("week");

  console.log("📆 Incoming sleepRecords:", sleepRecords);
  console.log("🗓️ selectedDate:", selectedDate);
  console.log("📅 startOfWeek:", startOfWeek.format("YYYY-MM-DD"));

  const data = [...Array(7)].map((_, i) => {
    console.log("Chart data:", data);

    const date = startOfWeek.add(i, "day").format("YYYY-MM-DD");
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
        barBorderRadius={6}
        maxValue={15} // This controls the Y-axis max
        noOfSections={5}
        yAxisLabelSuffix="h"
        yAxisTextStyle={{ color: "#888", fontSize: 12 }}
        xAxisLabelTextStyle={{ color: "#444", fontSize: 12 }}
        yAxisThickness={1}
        xAxisThickness={1}
        showGradient
        showLine={false}
        // yAxisLabelTexts={['0', '3', '6', '9', '12', '15']}
      />
    </View>
  );
};

export default SleepChart;
