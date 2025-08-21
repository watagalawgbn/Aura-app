import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  headerRow: {
    marginTop: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  timeIcon: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: "center", alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  moonIconStyle: { backgroundColor: "#E8F1E0" },
  sunIconStyle: { backgroundColor: "#FFEAC6" },
  iconText: { fontSize: 16 },

  timeLabel: { fontSize: 16, fontWeight: "600", color: "#0B1F02" },
  subtle: { fontSize: 12, color: "#667085", marginTop: 2 },
  bigTime: { fontSize: 28, fontWeight: "800", color: "#2E5A14" },

  sliderBlock: { marginTop: 8, paddingHorizontal: 20 },
  sliderTicks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  tickText: { fontSize: 12, color: "#606060" },

  quickTitle: { fontSize: 16, fontWeight: "700", color: "#0B1F02", marginBottom: 10 },
  chipsRow: { flexDirection: "row", gap: 12, flexWrap: "wrap" },
  chip: {
    paddingVertical: 10, paddingHorizontal: 14,
    borderRadius: 12, backgroundColor: "#F4F8EC",
    borderColor: "#E2F0CB", borderWidth: 1,
  },
  chipText: { fontSize: 14, fontWeight: "700", color: "#0B1F02" },
  chipSub: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  sleepDurationContainer: { alignItems: "center", marginTop: 28 },
  sleepDurationLabel: { fontSize: 16, color: "black", marginBottom: 10, fontWeight: "bold" },
  sleepDurationBadge: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderColor: "#4CAF50",
    borderRadius: 10,
    borderWidth: 1,
  },
  sleepDurationValue: { fontSize: 16, fontWeight: "bold", color: "black" },

  saveButton: {
    backgroundColor: "#5FB21F",
    marginHorizontal: 30,
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default styles;