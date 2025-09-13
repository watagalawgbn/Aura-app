import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import styles from "./AssessmentScreen.styles";
import {
  fetchAssessmentQuestions,
  submitAssessmentAnswers,
} from "../../services/assessmentService";
import { Question, Answer } from "@/types/assessment";
import { ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Assessment() {
  const [questions, setQuestions] = useState<Question[]>([]); //question list
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //current question index
  const [loading, setLoading] = useState(true); //loading state
  const [error, setError] = useState<string | null>(null); //error state
  const [selectedOption, setSelectedOption] = useState<{
    [index: number]: Answer;
  }>({}); //store user's answers

  const isOptionSelected = selectedOption[currentQuestionIndex] !== undefined; //check if the user has selected a option

  const fadeAnim = useRef(new Animated.Value(0)).current; //animation value
  const router = useRouter();

  //-------------FETCH QUESTIONS----------------
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchAssessmentQuestions(); //call the service
        setQuestions(data);
      } catch {
        setError("Failed to load assessment questions");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  //-------------NEXT BUTTON-----------------------
  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      //go to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      fadeIn();
    } else {
      //reached last question, submit answers
      const formattedAnswers = Object.values(selectedOption);

      try {
        const result = await submitAssessmentAnswers(formattedAnswers);
        //navigate to results screen with scores
        router.push({
          pathname: "/(tabs)/Assessment/AssessmentResultScreen",
          params: {
            scores: JSON.stringify(result.scores),
            recommendations: JSON.stringify(result.recommendations),
          },
        });
      } catch (error) {
        console.error("Failed to submit assessment", error);
      }
    }
  };

  //-------------BACK BUTTON-----------------------
  const handleBack = () => {
    if (currentQuestionIndex === 0) {
      //first question, go back to home
      router.push("/(tabs)/Home/HomeScreen");
    } else {
      //otherwise go to back one step
      fadeOut(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        fadeIn();
      });
    }
  };

  //-------------ANIMATION-----------------------
  const fadeIn = () => {
    fadeAnim.setValue(1); //reset opacity back to 0 (invisible)
    Animated.timing(fadeAnim, {
      toValue: 1, //animate from 0 → 1
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (onComplete?: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0, // animate from current value → 0
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      if(onComplete) onComplete();
    });
  };

  //start fade-in when questions load
  useEffect(() => {
    if (questions.length > 0) {
      fadeIn();
    }
  }, [questions]);

  //-------------LOADINF/ERROR HANDLING-----------------------
  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (error)
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );

  if (questions.length === 0) return null;

  //-------------RENDER QUESTION-----------------------
  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questions.length; //progress bar value

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <TouchableOpacity onPress={handleBack} style={styles.handleBackButton}>
        <Ionicons name="arrow-back" size={22} color="black" />
      </TouchableOpacity>

      <Animated.View style={{ opacity: fadeAnim }}>
        {currentQuestionIndex === 0 && (
          <Text style={styles.Title}>Let's check your status.</Text>
        )}

        <ProgressBar
          progress={progress}
          color="#4CAF50"
          style={styles.progressBar}
        />

        <Text style={styles.questionNumber}>
          Question {currentQuestionIndex + 1}
        </Text>

        <Text style={{ fontSize: 15, marginBottom: 10 }}>
          Over the last 2 weeks, how often have you been bothered by,
        </Text>

        <Text style={styles.currentQuestion}>{currentQuestion.question}?</Text>

        {/* options */}
        {currentQuestion.options.map((opt) => {
          const isSelected =
            selectedOption[currentQuestionIndex]?.answer === opt.value;
          return (
            <TouchableOpacity
              key={`${currentQuestion.id}-${opt.value}`}
              onPress={() =>
                setSelectedOption((prev) => ({
                  ...prev,
                  [currentQuestionIndex]: {
                    id: currentQuestion.id,
                    type: currentQuestion.type,
                    answer: opt.value,
                  },
                }))
              }
              style={[styles.options, isSelected && styles.selectedOption]}
            >
              <Text
                style={{
                  color: isSelected ? "#4CAF50" : "black",
                }}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      <TouchableOpacity
        onPress={handleNext}
        style={[styles.nextButton, { opacity: isOptionSelected ? 1 : 0.5 }]}
        disabled={!isOptionSelected}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
