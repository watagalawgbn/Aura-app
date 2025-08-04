import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import styles from "./SleepBetterScreen.styles";
import dayjs from "dayjs";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/BackButton";
import { Feather } from "@expo/vector-icons";
import SleepChart from "../../components/SleepChart";
import { fetchSleepData } from "../../services/sleepService";

const SleepBetterScreen = () => {
  type sleepRecord = {
    date: string;
    duration: number;
    startTime: string;
    endTime: string;
  };

  const [sleepRecords, setSleepRecords] = useState<sleepRecord[]>([]);
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

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSleepData();
        setSleepRecords(data);
      } catch (error) {
        console.error("Failed to load sleep data: ", error);
      }
    };
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

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
            onPress={() => router.push("/(tabs)/SleepScreen/SleepTimerScreen")}
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
            <Feather
              name="chevron-left"
              size={24}
              color="black"
              style={{ paddingTop: 20 }}
            />
          </TouchableOpacity>

          <Text style={styles.weekSelector}>
            Week of {chartWeekStart.format("MMM D")}
          </Text>
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
              style={{ paddingTop: 20 }}
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


export default SleepBetterScreen;
