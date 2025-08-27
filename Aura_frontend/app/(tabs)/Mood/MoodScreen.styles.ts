import { StyleSheet } from "react-native";


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
    fontWeight: "500",
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

export default styles;