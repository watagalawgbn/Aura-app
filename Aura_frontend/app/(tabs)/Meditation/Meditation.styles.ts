import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  scrollContent: { flexGrow: 1, paddingBottom: 30 },
  meditationContainer: { marginTop: 20, paddingHorizontal: 10 },
  meditationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  audioCard: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  imgs: {
    width: 160,
    height: 160,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  imgTitle: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
  },
  debugText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
    fontSize: 12,
    fontStyle: "italic",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;