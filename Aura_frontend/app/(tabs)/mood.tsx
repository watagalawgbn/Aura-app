import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { logMood } from "../services/moodService";

//define the props for moodlog
type MoodLogProps = {
  isVisible: boolean; // controls whether to show or hide the modal
  onClose: () => void; // call this function to close the modal
};

//list of mood images to select
const moods = [
  { label: "Happy", image: require("../../assets/images/happy.png") },
  { label: "Neutral", image: require("../../assets/images/neutral.png") },
  { label: "Sad", image: require("../../assets/images/sad.png") },
  { label: "Depressed", image: require("../../assets/images/depressed.png") },
  { label: "Angry", image: require("../../assets/images/angry.png") },
];

const MoodLog: React.FC<MoodLogProps> = ({ isVisible, onClose }) => {

  const [selectedMood, setSelectedMood] = useState<string | null>(null); // tracking the state of the selected mood

  //handle mood submission
  const handleSubmitMood = async () => {
    
    // if no mood selected, prevent the submission
    if (!selectedMood) { 
      Alert.alert(
        "No Mood Selected",
        "Please select a mood before proceeding."
      );
      return;
    }

    try {
      await logMood(selectedMood); //call moodService to add mood
      
      // show sucess message & close the modal
      Alert.alert(
        "Mood Noted",
        `You selected "${selectedMood}" as your mood.`,
        [{ text: "OK", onPress: onClose }]
      );
    } catch (err) {
      console.error("Error saving mood: ", err);
      //show error message if failes
      Alert.alert("Error", "Failed to log mood. Try again");
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

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "#DFF3E4",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  swipeBar: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    borderRadius: 3,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  moodItem: {
    alignItems: "center",
    width: 60,
    padding: 5,
    borderRadius: 10,
  },
  selectedMood: {
    backgroundColor: "#A7E9AF",
  },
  moodImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  moodLabel: {
    fontSize: 9,
  },
  moodQuestion: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default MoodLog;
