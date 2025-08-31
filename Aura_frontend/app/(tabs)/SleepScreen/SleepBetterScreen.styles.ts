import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#ffffff" 
  },
  scrollContent: { 
    flexGrow: 1, 
    paddingBottom: 100 
  },
  titleText: {
    fontSize: 18,
    fontWeight: "regular",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  outerContainer: {
    flexDirection: "row",
    borderColor: "#224831", // green border
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    justifyContent: "space-between",
    margin: 20,
  },
  dateChip: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#A5D6A7", // light green
    marginHorizontal: 4,
    backgroundColor: "white",
  },
  selectedChip: {
    backgroundColor: "#4CAF50", // selected green
    borderColor: "#4CAF50",
  },
  dayText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#224831",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#224831",
  },
  selectedText: {
    color: "white",
  },
  timeSelector: {
    flexDirection: "row",
    borderColor: "224831",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 100,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  timeSelectorText: {
    fontWeight: "bold",
    fontSize: 15,
    alignItems: "center",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  timeSelectorButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sleepChartContainer: {
    // marginTop: 10,
    padding: 10,
  },
  sleepChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  weekSelector: { fontWeight: "bold", fontSize: 16, paddingTop: 20 },
  avgSleepContainer: {
    // marginTop: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    borderColor: "#4CAF50",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 30,
  },
  avgSleepText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default styles;