import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: { flex: 1 },
  fallbackBackground: {
    backgroundColor: "#1a1a2e",
  },
  safeArea: { flex: 1 },
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  backButton: { flexDirection: "row", alignItems: "center" },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#52AE77",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 300,
  },
  meditationInfo: { alignItems: "center", marginBottom: 40 },
  meditationTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  meditationSubtitle: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
  },
  playerContainer: { width: "100%", padding: 20 },
  progressContainer: { marginBottom: 30 },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#52AE77",
  },
  timeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    color: "#ccc",
    fontSize: 14,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButton: {
    padding: 15,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#52AE77",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  playButtonDisabled: {
    backgroundColor: "#52AE7799",
  },
});

export default styles;