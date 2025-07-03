// src/screens/SleepBetterScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { useSleep } from "../../context/SleepContext";
import SleepChart from "../components/SleepChart";
import dayjs from "dayjs";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";

const weekDates = [...Array(7)].map((_, i) =>
  dayjs()
    .subtract(6 - i, "day")
    .format("YYYY-MM-DD")
);

const SleepBetterScreen = () => {
  const { sleepRecords } = useSleep();
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <BackButton title={"Sleep Better"} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>How long did you sleep?</Text>
        </View>
        {/* <View style={styles.DateContainer}>

        </View> */}

        <View style={styles.outerContainer}>
          {weekDates.map((date) => {
            const isSelected = date === selectedDate;
            return (
              <TouchableOpacity
                key={date}
                style={[styles.dateChip, isSelected && styles.selectedChip]}
                onPress={() => setSelectedDate(date)}
              >
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SleepBetterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  title: { fontSize: 18, fontWeight: "bold" },
  scrollContent: {},
  titleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "regular",
  },
  DateContainer: {
    borderBlockColor: "black",
    // borderColor: 'black',
    borderWidth: 3,
    borderRadius: 15,
  },

  outerContainer: {
    flexDirection: "row",
    borderColor: "#224831", // green border
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    justifyContent: "space-between",
  },
  dateChip: {
    alignItems: "center",
    padding: 10,
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

  //   dateChip: {
  //     marginRight: 10,
  //     padding: 10,
  //     backgroundColor: '#D6F5D6',
  //     borderRadius: 8,
  //   },
  //   editTime: {
  //     marginVertical: 20,
  //     padding: 15,
  //     backgroundColor: '#CCFFCC',
  //     borderRadius: 10,
  //   },
  //   chartTitle: { fontSize: 16, marginTop: 20, fontWeight: '600' },
  //   avgText: { marginTop: 10, fontSize: 14, fontWeight: '500' },
});
