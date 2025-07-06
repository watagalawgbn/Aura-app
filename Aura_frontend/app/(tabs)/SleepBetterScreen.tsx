import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { useSleep } from "../../context/SleepContext";
import dayjs from "dayjs";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { Feather } from "@expo/vector-icons";
import SleepChart from "../components/SleepChart";

type SleepData = {
  duration: number;
  date: string;
  startTime: string;
  endTime: string;
};

const SleepBetterScreen = () => {
  const { sleepRecords } = useSleep();
  const [chartWeekStart, setChartWeekStart] = useState(
    dayjs().startOf("week").add(1, "day")
  );
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const today = dayjs();
  const weekDates = [...Array(7)].map((_, i) =>
    today.subtract(6 - i, "day").format("YYYY-MM-DD")
  );

  const averageSleep = sleepRecords.length
    ? (
        sleepRecords.reduce((a, b) => a + b.duration, 0) / sleepRecords.length
      ).toFixed(1)
    : "0";

  const latestEntry = sleepRecords[sleepRecords.length - 1];

  const getTimeRange = () => {
    if (latestEntry) {
      const startTime = dayjs(latestEntry.startTime).format("hh:mmA");
      const endTime = dayjs(latestEntry.endTime).format("hh:mmA");
      return `${startTime} - ${endTime}`;
    }
    return "Log Your Sleep";
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <BackButton title={"Sleep Better"} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>How long did you sleep?</Text>
        </View>

        {/* Date Selector */}
        <View style={styles.outerContainer}>
          {weekDates.map((date) => {
            const isSelected = date === selectedDate;
            return (
              <TouchableOpacity
                key={date}
                style={[styles.dateChip, isSelected && styles.selectedChip]}
                onPress={() => setSelectedDate(date)}
              >
                {/* selecting date to input sleep hours & chart use that date to show the whole week it's in */}
                <Text
                  style={[styles.dayText, isSelected && styles.selectedText]}
                >
                  {dayjs(date).format("ddd")}
                </Text>
                <Text
                  style={[styles.dateText, isSelected && styles.selectedText]}
                >
                  {dayjs(date).format("DD")}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Time Selector */}
        <View style={styles.timeSelector}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/SleepTimerScreen")}
            style={styles.timeSelectorButton}
          >
            <Text style={styles.timeSelectorText}>{getTimeRange()}</Text>
            <Feather name="edit-2" size={18} color="black" />
          </TouchableOpacity>
        </View>

        {/* Sleep Chart */}
        <View style={styles.sleepChart}>
          
          <TouchableOpacity
            onPress={() =>
              setChartWeekStart((prev) => dayjs(prev).subtract(1, "week"))
            }
          >
            <Feather name="chevron-left" size={24} color="black" style={{paddingTop:20}} />
          </TouchableOpacity>

          <Text style={styles.weekSelector}>Week of {chartWeekStart.format("MMM D")}</Text>
          <TouchableOpacity
            disabled={
              chartWeekStart.isSame(dayjs(), "week") ||
              chartWeekStart.isAfter(dayjs())
            }
            onPress={() =>
              setChartWeekStart((prev) => dayjs(prev).add(1, "week"))
            }
          >
            <Feather
              name="chevron-right"
              size={24}
              style={{paddingTop:20}}
              color={
                chartWeekStart.isSame(dayjs(), "week") ||
                chartWeekStart.isAfter(dayjs())
                  ? "#ccc"
                  : "black"
              }
            />
          </TouchableOpacity>
        </View>

        <View style={styles.sleepChartContainer}>
          <SleepChart
            sleepRecords={sleepRecords}
            selectedDate={chartWeekStart.toISOString()}
          />
        </View>

        {/* Average Sleep Hours */}
        <View style={styles.avgSleepContainer}>
          <Text style={styles.avgSleepText}>
            Your average sleeping hours: {averageSleep} hours
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  scrollContent: {
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "regular",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  outerContainer: {
    flexDirection: "row",
    borderColor: "#224831", // green border
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    justifyContent: "space-between",
    margin: 20,
  },
  dateChip: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#A5D6A7", // light green
    marginHorizontal: 4,
    backgroundColor: "white",
  },
  selectedChip: {
    backgroundColor: "#4CAF50", // selected green
    borderColor: "#4CAF50",
  },
  dayText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#224831",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#224831",
  },
  selectedText: {
    color: "white",
  },
  timeSelector: {
    flexDirection: "row",
    borderColor: "224831",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 100,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  timeSelectorText: {
    fontWeight: "bold",
    fontSize: 15,
    alignItems: "center",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  timeSelectorButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sleepChartContainer: {
    // marginTop: 10,
    padding: 10,
  },
  sleepChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  weekSelector: { fontWeight: "bold", fontSize: 16, paddingTop: 20 },
  avgSleepContainer: {
    // marginTop: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    borderColor: "#4CAF50",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 30,
  },
  avgSleepText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SleepBetterScreen;
