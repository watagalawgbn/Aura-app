import { StyleSheet } from "react-native";


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
    backgroundColor: "#fff",
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
    backgroundColor: "#EBFCDE",
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

export default styles;