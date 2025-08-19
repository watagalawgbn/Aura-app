import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
  flexGrow: 1,
  padding: 24,
  backgroundColor: "#fff",
  alignItems: "center",
  paddingBottom: 80,
  paddingTop: 50,
},

  title: {
    color: "#333",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  breakdown: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    color: "#666",
    fontSize: 16,
  },
  sectionHeader: {
    color: "#333",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#52AE77",
    padding: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  feedbackBox: {
    backgroundColor: "#F0F9F2",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    width: "100%",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    justifyContent: "space-between",
  },
  recommendationText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});

export default styles;