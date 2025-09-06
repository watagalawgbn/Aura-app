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
} from "react-native";
import styles from "./BreathingExerciseScreen.styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useAnimatedProps,
  cancelAnimation,
} from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { saveBreathingSession } from "@/app/services/breathingService";
import Toast from "react-native-toast-message";


const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.5;
const PROGRESS_CIRCLE_SIZE = CIRCLE_SIZE + 100; // outer progress circle size
const PROGRESS_RADIUS = (PROGRESS_CIRCLE_SIZE - 20) / 2;
const STROKE_WIDTH = 8;
const CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS; //circumference of the progress circle

//animated svg circle
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Phase = "in" | "hold" | "out";

export default function BreathingExercise() {
  const [isPlaying, setIsPlaying] = useState(false); //whether session is running
  const [phase, setPhase] = useState<Phase>("in"); //current breathing phase
  const [seconds, setSeconds] = useState(4); //countdown timer
  const [quoteIndex, setQuoteIndex] = useState(0); // which quote to show
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null); //session start timestamp
  const [totalDuration, setTotalDuration] = useState<number>(0); //total session length

  const countdownInterval = useRef<number | null>(null); //countdown timer ref
  const intervalRef = useRef<number | null>(null); //phase timer ref

  const scale = useSharedValue(1); //circle scale(grow/shrink)
  const progress = useSharedValue(0); //progress bar value

  //durations(seconds) for each breathing phase
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

  //---------------------------ANIMATE EACH PHASE------------------
  const animatePhase = (phase: Phase) => {
    //stop any running animations
    cancelAnimation(scale);
    cancelAnimation(progress);

    // Reset progress to 0 at start of each phase
    progress.value = 0;

    if (phase === "in") {
      //scale up during inhale
      scale.value = withTiming(1.2, {
        duration: phaseDurations.in * 1000,
        easing: Easing.inOut(Easing.ease),
      });
      progress.value = withTiming(1, {
        duration: phaseDurations.in * 1000,
        easing: Easing.linear,
      });
    } else if (phase === "out") {
      //scale down during exhale
      scale.value = withTiming(1, {
        duration: phaseDurations.out * 1000,
        easing: Easing.inOut(Easing.ease),
      });
      progress.value = withTiming(1, {
        duration: phaseDurations.out * 1000,
        easing: Easing.linear,
      });
    } else if (phase === "hold") {
      // Keep current scale during hold, only progress
      progress.value = withTiming(1, {
        duration: phaseDurations.hold * 1000,
        easing: Easing.linear,
      });
    }
  };

  //-----------------START SESSION----------------
  const startBreathing = () => {
    let currentPhase: Phase = "in";
    setPhase(currentPhase);
    setSeconds(phaseDurations[currentPhase]);
    animatePhase(currentPhase);
    setSessionStartTime(Date.now());

    //countdown for seconds display
    countdownInterval.current = setInterval(() => {
      setSeconds((s) => {
        return s > 0 ? s - 1 : s;
      });
    }, 1000);

    //recursive phase loop
    const runPhase = (nextPhase: Phase) => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length); // cycle quotes
      setPhase(nextPhase);
      setSeconds(phaseDurations[nextPhase]);
      animatePhase(nextPhase);

      //choose next phase
      const next: Phase =
        nextPhase === "in" ? "hold" : nextPhase === "hold" ? "out" : "in";

      // schedule next phase change
      intervalRef.current = setTimeout(
        () => runPhase(next),
        phaseDurations[nextPhase] * 1000
      );
    };

    runPhase(currentPhase);
  };

  //---------------STOP SESSION------------------------
  const stopBreathing = (save = true) => {
    cancelAnimation(scale);
    cancelAnimation(progress);

    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (countdownInterval.current) clearInterval(countdownInterval.current);

    scale.value = 1;
    progress.value = 0;
    setPhase("in");
    setSeconds(4);

    if (save && sessionStartTime) {
      const durationSec = Math.floor((Date.now() - sessionStartTime) / 1000);
      setTotalDuration(durationSec);
      saveBreathingSession(durationSec);

      Toast.show({
        type: "success",
        text1: "Session Complete 🎉",
        text2: `You breathed for ${durationSec} seconds`,
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      })
    }
  };

  //-------------------HANDLE PLAY/PAUSE
  useEffect(() => {
    if (isPlaying) {
      startBreathing();
    } else {
      stopBreathing(true); // only save when user explicitly pauses
    }
    return () => stopBreathing(false); // cleanup without saving
  }, [isPlaying]);

  //---------------ANIMATED STYLES-----------------
  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedStroke = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCUMFERENCE - CIRCUMFERENCE * progress.value,
    };
  });

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

      {/* Animated circle + progress circle */}
      <View style={styles.circleWrapper}>
        <Svg
          width={PROGRESS_CIRCLE_SIZE}
          height={PROGRESS_CIRCLE_SIZE}
          style={styles.svgContainer}
        >
          {/* bg circle */}
          <Circle
            cx={PROGRESS_CIRCLE_SIZE / 2}
            cy={PROGRESS_CIRCLE_SIZE / 2}
            r={PROGRESS_RADIUS}
            stroke="#E0E0E0"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          {/* progress circle */}
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
        {/* inner animated breating circle */}
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
