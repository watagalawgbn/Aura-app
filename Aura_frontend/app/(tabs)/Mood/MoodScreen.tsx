import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./MoodScreen.styles";
import Modal from "react-native-modal";
import { logMood } from "../../services/moodService";
import Toast from "react-native-toast-message";

//define the props for moodlog
type MoodLogProps = {
  isVisible: boolean; // controls whether to show or hide the modal
  onClose: () => void; // call this function to close the modal
};

//list of mood images to select
const moods = [
  { label: "Happy", image: require("../../../assets/images/happy.png") },
  { label: "Neutral", image: require("../../../assets/images/neutral.png") },
  { label: "Sad", image: require("../../../assets/images/sad.png") },
  { label: "Depressed", image: require("../../../assets/images/depressed.png") },
  { label: "Angry", image: require("../../../assets/images/angry.png") },
];

const MoodLog: React.FC<MoodLogProps> = ({ isVisible, onClose }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null); // tracking the state of the selected mood

  //handle mood submission
  const handleSubmitMood = async () => {
    // if no mood selected, prevent the submission
    if (!selectedMood) {

      Toast.show({
        type: "error",
        text1: "Error ⚠️",
        text2: "Please select a mood before proceeding.",
        visibilityTime: 4000,
        position: "top",
        autoHide: true,
      });
      return;
    }

    try {
      await logMood(selectedMood); //call moodService to add mood
      Toast.show({
        type: "success",
        text1: "Success 🎉",
        text2: `You selected "${selectedMood}" as your mood.`,
        visibilityTime: 4000,
        position: "top",
        autoHide: true,
      });
    } catch (err) {
      console.error("Error saving mood: ", err);
      Toast.show({
        type: "error",
        text1: "Error ⚠️",
        text2: "Failed to log mood. Try again!",
        visibilityTime: 4000,
        position: "top",
        autoHide: true,
      });
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      swipeDirection="down"
      onSwipeComplete={onClose}
      backdropOpacity={0.4}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      {/* Mood selector pop up */}
      <View style={styles.container}>
        <View style={styles.swipeBar} />
        <Text style={styles.title}>Daily Mood Log</Text>

        <Text style={styles.moodQuestion}>
          How do you feel about your current emotions?
        </Text>

        {/* horizontal row of moods */}
        <View style={styles.moodRow}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.label}
              style={[
                styles.moodItem,
                selectedMood === mood.label && styles.selectedMood, // Highlight selected mood
              ]}
              onPress={() => setSelectedMood(mood.label)} // Set selected mood
            >
              <Image source={mood.image} style={styles.moodImage} />
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmitMood}>
          <Text style={styles.buttonText}>Note Mood</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};


export default MoodLog;
