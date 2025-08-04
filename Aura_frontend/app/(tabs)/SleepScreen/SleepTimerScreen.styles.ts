import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  timeItem: {
    alignItems: "center",
  },
  timeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  circleWrapper: {
    alignSelf: "center",
    marginTop: 20,
    padding: 35,
    borderRadius: 160,
  },
  circleInner: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: { fontSize: 36, fontWeight: "bold", color: "#294C0D" },
  timeLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  circleContainer: {
    alignItems: "center",
    marginTop: 40,
    height: 300,
  },
  svg: {
    position: "absolute",
  },
  dragIcon: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sunIconStyle: {
    backgroundColor: "#FFE4B5",
  },
  iconText: {
    fontSize: 16,
  },
  sleepDurationContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  sleepDurationLabel: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
    fontWeight: "bold",
  },
  sleepDurationBadge: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderColor: "#4CAF50",
    borderRadius: 10,
    borderWidth: 1,
    // paddingHorizontal: 50,
  },
  sleepDurationValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  saveButton: {
    backgroundColor: "#5FB21F",
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;