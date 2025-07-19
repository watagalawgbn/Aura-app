// src/screens/SleepTimerScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";
import dayjs from "dayjs";
import BackButton from "../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { postSleepRecord } from "../services/sleepService";

const SleepTimerScreen = ({ navigation }: any) => {
  // Convert time to angle (0-360 degrees)
  const timeToAngle = (hours: number, minutes: number) => {
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / (12 * 60)) * 360 - 90; // -90 to start from top
  };

  // Convert angle to time
  const angleToTime = (angle: number) => {
    const normalizedAngle = (angle + 90 + 360) % 360;
    const totalMinutes = (normalizedAngle / 360) * (12 * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    return { hours: hours === 0 ? 12 : hours, minutes };
  };

  // Calculate angle from center point
  const calculateAngle = (
    x: number,
    y: number,
    centerX: number,
    centerY: number
  ) => {
    "worklet";
    const dx = x - centerX;
    const dy = y - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  // Default times
  const [bedtimeHours, setBedtimeHours] = useState(11);
  const [bedtimeMinutes, setBedtimeMinutes] = useState(0);
  const [wakeHours, setWakeHours] = useState(8);
  const [wakeMinutes, setWakeMinutes] = useState(0);

  // Animated values for dragging
  const moonAngle = useSharedValue(timeToAngle(bedtimeHours, bedtimeMinutes));
  const sunAngle = useSharedValue(timeToAngle(wakeHours, wakeMinutes));

  const circleRadius = 100;
  const centerX = 150;
  const centerY = 150;
  const iconRadius = 12;

  // Calculate position from angle
  const getPositionFromAngle = (angle: number) => {
    "worklet";
    const radians = (angle * Math.PI) / 180;
    return {
      x: centerX + circleRadius * Math.cos(radians) - iconRadius,
      y: centerY + circleRadius * Math.sin(radians) - iconRadius,
    };
  };

  // Calculate sleep duration
  const calculateSleepDuration = () => {
    const bedtimeTotalMinutes = bedtimeHours * 60 + bedtimeMinutes;
    const wakeTotalMinutes =
      (wakeHours + (wakeHours < bedtimeHours ? 24 : 0)) * 60 + wakeMinutes;
    const diffMinutes = wakeTotalMinutes - bedtimeTotalMinutes;
    return Math.round((diffMinutes / 60) * 10) / 10; // Round to 1 decimal place
  };

  // Update bedtime from angle
  const updateBedtime = (angle: number) => {
    const time = angleToTime(angle);
    setBedtimeHours(time.hours);
    setBedtimeMinutes(time.minutes);
  };

  // Update wake time from angle
  const updateWakeTime = (angle: number) => {
    const time = angleToTime(angle);
    setWakeHours(time.hours);
    setWakeMinutes(time.minutes);
  };

  // Moon drag handler
  const moonGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, context) => {
        context.startAngle = moonAngle.value;
      },
      onActive: (event, context) => {
        const angle = calculateAngle(
          event.absoluteX,
          event.absoluteY,
          centerX,
          centerY
        );
        moonAngle.value = angle;
        runOnJS(updateBedtime)(angle);
      },
    });

  // Sun drag handler
  const sunGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, context) => {
        context.startAngle = sunAngle.value;
      },
      onActive: (event, context) => {
        const angle = calculateAngle(
          event.absoluteX,
          event.absoluteY,
          centerX,
          centerY
        );
        sunAngle.value = angle;
        runOnJS(updateWakeTime)(angle);
      },
    });

  // Animated styles
  const moonAnimatedStyle = useAnimatedStyle(() => {
    const position = getPositionFromAngle(moonAngle.value);
    return {
      transform: [{ translateX: position.x }, { translateY: position.y }],
    };
  });

  const sunAnimatedStyle = useAnimatedStyle(() => {
    const position = getPositionFromAngle(sunAngle.value);
    return {
      transform: [{ translateX: position.x }, { translateY: position.y }],
    };
  });

  // Format time display
  const formatTime = (hours: number, minutes: number) => {
    const displayHours = hours === 0 ? 12 : hours;
    const displayMinutes = minutes.toString().padStart(2, "0");
    const ampm = hours < 12 ? "AM" : "PM";
    return `${displayHours}:${displayMinutes}${ampm}`;
  };

  // Save sleep record
  const handleSave = async () => {
   try{
    const newRecord = {
      date: dayjs().format("YYYY-MM-DD"),
      startTime: formatTime(bedtimeHours, bedtimeMinutes),
      endTime: formatTime(wakeHours, wakeMinutes),
      duration: calculateSleepDuration(),
    };
    await postSleepRecord(newRecord);
    navigation.goBack();
   }
   catch(error){
    console.error("Failed to save sleep record:", error);
   }
  };

  // Generate hour marks
  const generateHourMarks = () => {
    const marks = [];
    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180); // 30 degrees per hour
      const x = centerX + (circleRadius - 20) * Math.cos(angle);
      const y = centerY + (circleRadius - 20) * Math.sin(angle);

      marks.push(
        <SvgText
          key={i}
          x={x}
          y={y + 5}
          textAnchor="middle"
          fontSize="14"
          fill="#666"
          fontWeight="500"
        >
          {i}
        </SvgText>
      );
    }
    return marks;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <BackButton title="Sleep Timer" />

        {/* Time Display */}
        <View style={styles.timeContainer}>
          <View style={styles.timeItem}>
            <View style={styles.timeIcon}>
              <Image
                source={require("../../assets/images/moon.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text style={styles.timeLabel}>Bedtime</Text>
            <Text style={styles.timeValue}>
              {formatTime(bedtimeHours, bedtimeMinutes)}
            </Text>
          </View>

          <View style={styles.timeItem}>
            <View style={styles.timeIcon}>
              <Image
                source={require("../../assets/images/sun.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text style={styles.timeLabel}>Wake Up</Text>
            <Text style={styles.timeValue}>
              {formatTime(wakeHours, wakeMinutes)}
            </Text>
          </View>
        </View>

        <LinearGradient
          colors={["#294C0D", "#5FB21F"]}
          style={styles.circleWrapper}
        >
          <View style={styles.circleInner}></View>
        </LinearGradient>

        {/* Circular Timer */}

        {/* Sleep Duration */}
        <View style={styles.sleepDurationContainer}>
          <Text style={styles.sleepDurationLabel}>Total Sleep</Text>
          <View style={styles.sleepDurationBadge}>
            <Text style={styles.sleepDurationValue}>
              {calculateSleepDuration()} hrs
            </Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Sleep Record</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  timeItem: {
    alignItems: "center",
  },
  timeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  circleWrapper: {
    alignSelf: "center",
    marginTop: 20,
    padding: 25,
    borderRadius: 160,
  },
  circleInner: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: { fontSize: 36, fontWeight: "bold", color: "#294C0D" },
  timeLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  circleContainer: {
    alignItems: "center",
    marginTop: 40,
    height: 300,
  },
  svg: {
    position: "absolute",
  },
  dragIcon: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sunIconStyle: {
    backgroundColor: "#FFE4B5",
  },
  iconText: {
    fontSize: 16,
  },
  sleepDurationContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  sleepDurationLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  sleepDurationBadge: {
    backgroundColor: "#5FB21F",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sleepDurationValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#5FB21F",
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SleepTimerScreen;
