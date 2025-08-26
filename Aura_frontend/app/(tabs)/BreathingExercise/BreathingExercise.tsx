import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from './BreathingExercise.styles';
import * as SecureStore from "expo-secure-store";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useAnimatedProps,
  cancelAnimation,
} from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { BASE_URL } from "@/constants/Api";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.5;
const PROGRESS_CIRCLE_SIZE = CIRCLE_SIZE + 100; // Progress ring is larger
const PROGRESS_RADIUS = (PROGRESS_CIRCLE_SIZE - 20) / 2;
const STROKE_WIDTH = 8;
const CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Phase = "in" | "hold" | "out";

export default function BreathingExercise() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<Phase>("in");
  const [seconds, setSeconds] = useState(4);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  const countdownInterval = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const scale = useSharedValue(1);
  const progress = useSharedValue(0);

  const phaseDurations: Record<Phase, number> = {
    in: 4,
    hold: 7,
    out: 8,
  };

  const quotes = [
    "Feel your breath flow naturally.",
    "Let go of all distractions.",
    "You are calm and grounded.",
    "Embrace stillness and peace.",
    "Inhale calm, exhale stress.",
    "You are safe, you are well.",
  ];

  const animatePhase = (phase: Phase) => {
    console.log("Animating phase:", phase);
    cancelAnimation(scale);
    cancelAnimation(progress);

    // Reset progress to 0 at start of each phase
    progress.value = 0;

    if (phase === "in") {
      scale.value = withTiming(1.2, {
        duration: phaseDurations.in * 1000,
        easing: Easing.inOut(Easing.ease),
      });
      progress.value = withTiming(1, {
        duration: phaseDurations.in * 1000,
        easing: Easing.linear,
      });
    } else if (phase === "out") {
      scale.value = withTiming(1, {
        duration: phaseDurations.out * 1000,
        easing: Easing.inOut(Easing.ease),
      });
      progress.value = withTiming(1, {
        duration: phaseDurations.out * 1000,
        easing: Easing.linear,
      });
    } else if (phase === "hold") {
      // Keep current scale during hold
      progress.value = withTiming(1, {
        duration: phaseDurations.hold * 1000,
        easing: Easing.linear,
      });
    }
  };

  const startBreathing = () => {
    let currentPhase: Phase = "in";
    setPhase(currentPhase);
    setSeconds(phaseDurations[currentPhase]);
    animatePhase(currentPhase);
    setSessionStartTime(Date.now());

    countdownInterval.current = setInterval(() => {
      setSeconds((s) => {
        return s > 0 ? s - 1 : s;
      });
    }, 1000);

    const runPhase = (nextPhase: Phase) => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length); // move this above phase change
      setPhase(nextPhase);
      setSeconds(phaseDurations[nextPhase]);
      animatePhase(nextPhase);

      const next: Phase =
        nextPhase === "in" ? "hold" : nextPhase === "hold" ? "out" : "in";

      intervalRef.current = setTimeout(
        () => runPhase(next),
        phaseDurations[nextPhase] * 1000
      );
    };

    runPhase(currentPhase);
  };

  const stopBreathing = () => {
    cancelAnimation(scale);
    cancelAnimation(progress);
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (countdownInterval.current) clearInterval(countdownInterval.current);

    scale.value = 1;
    progress.value = 0;
    setPhase("in");
    setSeconds(4);

    if (sessionStartTime) {
      const durationSec = Math.floor((Date.now() - sessionStartTime) / 1000);
      setTotalDuration(durationSec); // still useful if you want it stored in state
      sendSessionToBackend(durationSec);

      // ✅ Move Alert here
      Alert.alert(
        "Session Complete",
        `You breathed for ${durationSec} seconds`
      );
      console.log("alert sent");
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startBreathing();
    } else {
      stopBreathing();
    }

    return stopBreathing;
  }, [isPlaying]);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedStroke = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCUMFERENCE - CIRCUMFERENCE * progress.value,
    };
  });

  const sendSessionToBackend = async (durationInSeconds: number) => {
    try {
      const userId = await SecureStore.getItemAsync("userId"); // Dynamically loaded
      const token = await SecureStore.getItemAsync("authToken");
      if (!userId) return console.warn("User ID not found in SecureStore");

      await fetch(`${BASE_URL}/api/breathing-sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          duration: durationInSeconds,
          pattern: { inhale: 4, hold: 7, exhale: 8 },
        }),
      });
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <View style={styles.circle2}>
            <Feather name="arrow-left" size={20} color="black" />
          </View>
        </TouchableOpacity>

        <View style={styles.titleWrapper}>
          <Text style={styles.headerTitle}>Breathing Exercise</Text>
        </View>

        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="#52AE77" />
        </TouchableOpacity>
      </View>

      <View style={styles.circleWrapper}>
        <Svg
          width={PROGRESS_CIRCLE_SIZE}
          height={PROGRESS_CIRCLE_SIZE}
          style={styles.svgContainer}
        >
          <Circle
            cx={PROGRESS_CIRCLE_SIZE / 2}
            cy={PROGRESS_CIRCLE_SIZE / 2}
            r={PROGRESS_RADIUS}
            stroke="#E0E0E0"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          <AnimatedCircle
            cx={PROGRESS_CIRCLE_SIZE / 2}
            cy={PROGRESS_CIRCLE_SIZE / 2}
            r={PROGRESS_RADIUS}
            stroke="#53A317"
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            animatedProps={animatedStroke}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>

        <Animated.View style={[styles.circle, animatedCircleStyle]}>
          <Svg
            height={CIRCLE_SIZE}
            width={CIRCLE_SIZE}
            style={StyleSheet.absoluteFill}
          >
            <Defs>
              <RadialGradient id="grad" cx="50%" cy="50%" r="50%">
                <Stop offset="25%" stopColor="#5FB21F" stopOpacity="1" />
                <Stop offset="100%" stopColor="#224831" stopOpacity="1" />
              </RadialGradient>
            </Defs>
            <Circle
              cx={CIRCLE_SIZE / 2}
              cy={CIRCLE_SIZE / 2}
              r={CIRCLE_SIZE / 2}
              fill="url(#grad)"
            />
          </Svg>

          <Text style={styles.phaseText}>
            {phase === "in"
              ? "Breathe In"
              : phase === "hold"
              ? "Hold"
              : "Breathe Out"}
          </Text>
        </Animated.View>
      </View>

      <Text style={styles.quote}>{quotes[quoteIndex]}</Text>

      <Text style={styles.timer}>{seconds}s</Text>

      <Pressable
        onPress={() => setIsPlaying((prev) => !prev)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{isPlaying ? "Pause" : "Start"}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

