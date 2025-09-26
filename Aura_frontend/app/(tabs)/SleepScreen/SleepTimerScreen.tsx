// src/screens/SleepTimerScreen.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import dayjs from "dayjs";
import BackButton from "../../components/BackButton";
import styles from "./SleepTimerScreen.styles";
import { postSleepRecord } from "@/app/services/sleepService";
import { useLocalSearchParams, useRouter } from "expo-router";

const STEP_MINUTES = 15;

// slider ranges (in minutes from midnight)
const BED_MIN = 0; // midnight
const BED_MAX = 24 * 60; // full day
const WAKE_MIN = 0;
const WAKE_MAX = 24 * 60;

const toDisplay = (mins: number) => {
  const m = ((mins % 1440) + 1440) % 1440; // 11PM → 1380
  const h24 = Math.floor(m / 60);
  const min = m % 60;
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const mm = min.toString().padStart(2, "0");
  return `${h12}:${mm}${ampm}`;
};

// midnight at the end of the bedtime slider (value = 1440),
const bedToSlider = (bed: number) => (bed === 0 ? 1440 : bed);
const sliderToBed = (v: number) => (v === 1440 ? 0 : v);

const SleepTimerScreen = () => {
  const router = useRouter();
  const { date } = useLocalSearchParams<{ date: string }>();

  // default to today if not provided
  const targetDate = date || dayjs().format("YYYY-MM-DD");

  // initial values like screenshot: Bed 12:00 AM, Wake 8:00 AM
  const [bedtime, setBedtime] = useState<number>(0); // 12:00 AM
  const [wakeTime, setWakeTime] = useState<number>(8 * 60); // 8:00 AM

  const sleepDuration = useMemo(() => {
    // duration across midnight
    const start = bedtime;
    const end = wakeTime;
    const diff = (end - start + 1440) % 1440;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return { h, m, label: `${h}h ${m}m` };
  }, [bedtime, wakeTime]);

  const applyPreset = (bed: number, wake: number) => {
    setBedtime(bed);
    setWakeTime(wake);
  };

  const onSave = async () => {
    try {
      const date = dayjs().format("YYYY-MM-DD");

      const startTime = dayjs(date)
        .startOf("day")
        .add(bedtime, "minute")
        .toISOString();
      const endTime = dayjs(date)
        .startOf("day")
        .add(wakeTime, "minute")
        .toISOString();

      // send hours as whole number with decimal precision
      const hours = parseFloat(
        (sleepDuration.h + sleepDuration.m / 60).toFixed(2)
      );

      await postSleepRecord({
        date: targetDate,
        duration: hours,
        startTime,
        endTime,
      });

      router.back();
    } catch (e) {
      console.error("Failed to save sleep record:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <BackButton title="Sleep Timer" />

      {/* BEDTIME ROW */}
      <View style={styles.headerRow}>
        <View style={styles.leftHeader}>
          <View style={[styles.timeIcon, styles.moonIconStyle]}>
            <Image
              source={require("../../../assets/images/moon.png")}
              style={{ width: 22, height: 22 }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.timeLabel}>Bedtime</Text>
            <Text style={styles.subtle}>When you sleep</Text>
          </View>
        </View>
        <Text style={styles.bigTime}>{toDisplay(bedtime)}</Text>
      </View>

      <View style={styles.sliderBlock}>
        <Slider
          value={bedToSlider(bedtime)}
          onValueChange={(v) =>
            setBedtime(sliderToBed(Math.round(v / STEP_MINUTES) * STEP_MINUTES))
          }
          minimumValue={BED_MIN}
          maximumValue={BED_MAX}
          step={STEP_MINUTES}
          minimumTrackTintColor="#2E5A14"
          maximumTrackTintColor="#EAEFCF"
          thumbTintColor="#2E5A14"
        />
        <View style={styles.sliderTicks}>
          <Text style={styles.tickText}>12:00 AM</Text>
          <Text style={styles.tickText}>11:59 PM</Text>
        </View>
      </View>

      {/* WAKE ROW */}
      <View style={[styles.headerRow, { marginTop: 24 }]}>
        <View style={styles.leftHeader}>
          <View style={[styles.timeIcon, styles.sunIconStyle]}>
            <Image
              source={require("../../../assets/images/sun.png")}
              style={{ width: 22, height: 22 }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.timeLabel}>Wake Up</Text>
            <Text style={styles.subtle}>When you rise</Text>
          </View>
        </View>
        <Text style={styles.bigTime}>{toDisplay(wakeTime)}</Text>
      </View>

      <View style={styles.sliderBlock}>
        <Slider
          value={wakeTime}
          onValueChange={(v) =>
            setWakeTime(Math.round(v / STEP_MINUTES) * STEP_MINUTES)
          }
          minimumValue={WAKE_MIN}
          maximumValue={WAKE_MAX}
          step={STEP_MINUTES}
          minimumTrackTintColor="#2E5A14"
          maximumTrackTintColor="#F3EBC7"
          thumbTintColor="#2E5A14"
        />
        <View style={styles.sliderTicks}>
          <Text style={styles.tickText}>12:00 AM</Text>
          <Text style={styles.tickText}>11:59 PM</Text>
        </View>
      </View>

      {/* QUICK SETUP */}
      <View
        style={{ marginTop: 24, paddingHorizontal: 20, alignItems: "center" }}
      >
        <Text style={styles.quickTitle}>Quick Setup</Text>
        <View style={styles.chipsRow}>
          <TouchableOpacity
            style={styles.chip}
            onPress={() => applyPreset(22 * 60, 6 * 60)}
          >
            <Text style={styles.chipText}>Early Bird</Text>
            <Text style={styles.chipSub}>10PM–6AM</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chip}
            onPress={() => applyPreset(23 * 60, 7 * 60)}
          >
            <Text style={styles.chipText}>Standard</Text>
            <Text style={styles.chipSub}>11PM–7AM</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chip}
            onPress={() => applyPreset(0, 8 * 60)}
          >
            <Text style={styles.chipText}>Night Owl</Text>
            <Text style={styles.chipSub}>12AM–8AM</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* DURATION + CTA */}
      <View style={styles.sleepDurationContainer}>
        <Text style={styles.sleepDurationLabel}>Sleep Duration</Text>
        <View style={styles.sleepDurationBadge}>
          <Text style={styles.sleepDurationValue}>{sleepDuration.label}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>Log Sleep Hours</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SleepTimerScreen;
