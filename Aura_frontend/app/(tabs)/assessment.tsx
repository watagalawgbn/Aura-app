import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from "react-native";
import { fetchAssessmentQuestions } from "../services/assessmentService";
import { ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Option = {
  label: string;
  value: number;
};

type Question = {
  id: string;
  question: string;
  type: "PHQ" | "GAD" | "DASS";
  options: Option[];
};

export default function Assessment() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<{[questionIndex: number] :number}>({});
  const isOptionSelected = selectedOption[currentQuestionIndex] !== undefined;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchAssessmentQuestions();
        setQuestions(data);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setError("Failed to load assessment questions");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      fadeIn();
    } else {
      alert("Assessment completed!");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex === 0) {
      router.navigate("/(tabs)/home");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      fadeIn();
    }
  };

  const fadeIn = () => {
    fadeAnim.setValue(0); // Reset to invisible
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (questions.length > 0) {
      fadeIn();
    }
  }, [questions]);

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

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questions.length;

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={handleBack} style={styles.handleBackButton}>
        <Ionicons name="arrow-back" size={22} color="black" />
      </TouchableOpacity>

      {/* animated content */}
      <Animated.View style={{ opacity: fadeAnim }}>
        {currentQuestionIndex === 0 && (
          <Text style={styles.Title}>Let's check your status.</Text>
        )}

        {/* progress Bar */}
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

        {currentQuestion.options.map((opt) => {
          const isSelected = selectedOption[currentQuestionIndex] === opt.value;
          return (
            <TouchableOpacity
              key={`${currentQuestion.id}-${opt.value}`}
              onPress={() => {
                setSelectedOption(prev => ({
                  ...prev,
                  [currentQuestionIndex]: opt.value,
                }))
              }} 
              style={[
                styles.options,
                isSelected && styles.selectedOption, 
              ]}
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

      <TouchableOpacity onPress={handleNext} style={[styles.nextButton, {opacity: isOptionSelected? 1:0.5}]} disabled={!isOptionSelected}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  handleBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  Title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  progressBar: {
    height: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  currentQuestion: {
    marginBottom: 20,
    borderColor: "#5FB21F",
    backgroundColor: "#EBFCDE",
    borderWidth: 1,
    borderRadius: 10,
    padding: 30,
  },
  options: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: '#EBFCDE', 
    borderColor: '#5FB21F',
    borderWidth: 1,
  },  
  nextButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
});
