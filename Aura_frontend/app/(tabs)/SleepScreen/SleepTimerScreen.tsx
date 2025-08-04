// src/screens/SleepTimerScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./SleepTimerScreen.styles";
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
import BackButton from "../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { postSleepRecord } from "../../services/sleepService";
import { PanGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture";

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
  const [bedtimeHours, setBedtimeHours] = useState(10);
  const [bedtimeMinutes, setBedtimeMinutes] = useState(0);
  const [wakeHours, setWakeHours] = useState(5);
  const [wakeMinutes, setWakeMinutes] = useState(0);
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Animated values for dragging
  const moonAngle = useSharedValue(timeToAngle(bedtimeHours, bedtimeMinutes));
  const sunAngle = useSharedValue(timeToAngle(wakeHours, wakeMinutes));

  const circleRadius = 130;
  const centerX = layout.width / 2;
  const centerY = layout.height / 2;
  const iconRadius = 95;

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
  const formatTime = (
    hours: number,
    minutes: number,
    isBedtime: boolean
  ): string => {
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayMinutes = minutes.toString().padStart(2, "0");

    let ampm;

    if (isBedtime && hours >= 6 && hours < 12) {
      ampm = "PM";
    } else if (!isBedtime && (hours === 12 || hours < 12)) {
      ampm = "AM";
    } else if (!isBedtime) {
      ampm = "PM";
    }

    return `${displayHours}:${displayMinutes}${ampm}`;
  };

  // Save sleep record
  const handleSave = async () => {
    try {
      const newRecord = {
        date: dayjs().format("YYYY-MM-DD"),
        startTime: formatTime(bedtimeHours, bedtimeMinutes, true),
        endTime: formatTime(wakeHours, wakeMinutes, false),
        duration: calculateSleepDuration(),
      };
      await postSleepRecord(newRecord);
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save sleep record:", error);
    }
  };

  // Generate hour marks
  const generateHourMarks = () => {
    const marks = [];
    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180); // 30 degrees per hour
      const x = centerX + circleRadius * Math.cos(angle);
      const y = centerY + circleRadius * Math.sin(angle);

      marks.push(
        <SvgText
          key={i}
          x={x + 55}
          y={y + 55}
          textAnchor="middle"
          fontSize="20"
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
                source={require("../../../assets/images/moon.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text style={styles.timeLabel}>Bedtime</Text>
            <Text style={styles.timeValue}>
              {formatTime(bedtimeHours, bedtimeMinutes, true)}
            </Text>
          </View>

          <View style={styles.timeItem}>
            <View style={styles.timeIcon}>
              <Image
                source={require("../../../assets/images/sun.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text style={styles.timeLabel}>Wake Up</Text>
            <Text style={styles.timeValue}>
              {formatTime(wakeHours, wakeMinutes, false)}
            </Text>
          </View>
        </View>

        <LinearGradient
          colors={["#294C0D", "#5FB21F"]}
          style={styles.circleWrapper}
        >
          <View
            style={styles.circleInner}
            onLayout={(e) => setLayout(e.nativeEvent.layout)}
          >
            <Svg
              height="100%"
              width="100%"
              style={StyleSheet.absoluteFill}
              viewBox="0 0 300 300"
            >
              {/* hour marks */}
              {generateHourMarks()}
            </Svg>

            {/* Moon icon */}
            <PanGestureHandler onGestureEvent={moonGestureHandler}>
              <Animated.View style={[styles.dragIcon, moonAnimatedStyle]}>
                <Image
                  source={require("../../../assets/images/moon.png")}
                  style={{ width: 24, height: 24 }}
                />
              </Animated.View>
            </PanGestureHandler>

            {/* Sun icon */}
            <PanGestureHandler onGestureEvent={sunGestureHandler}>
              <Animated.View style={[styles.dragIcon, sunAnimatedStyle]}>
                <Image
                  source={require("../../../assets/images/sun.png")}
                  style={{ width: 24, height: 24 }}
                />
              </Animated.View>
            </PanGestureHandler>
          </View>
        </LinearGradient>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Sleep Record</Text>
        </TouchableOpacity>

        {/* Sleep Duration */}
        <View style={styles.sleepDurationContainer}>
          <Text style={styles.sleepDurationLabel}>Total Sleep</Text>
          <View style={styles.sleepDurationBadge}>
            <Text style={styles.sleepDurationValue}>
              {calculateSleepDuration()} hrs
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SleepTimerScreen;