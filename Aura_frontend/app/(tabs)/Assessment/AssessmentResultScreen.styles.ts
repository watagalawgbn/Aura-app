import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#ffffffff",
    alignItems: "center",
    paddingBottom: 80,
    paddingTop: 50
  },

  title: {
    color: "#1c3a2e",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  feedbackBox: {
    backgroundColor: "#F0F9F2",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1c3a2e",
    marginBottom: 6,
    textAlign: "center"
  },
  recommendationText: {
    fontSize: 14,
    color: "#4b5a55",
    lineHeight: 20,
    textAlign: "center"
  },

  /* unified section headers */
  sectionHeader: {
    color: "#1c3a2e",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 28,
    marginBottom: 5,
    alignSelf: "flex-start"
  },
  
  sectionSubheader: {
    color: "#4b5a55",
    fontSize: 16,
    fontWeight: "600",
    // marginTop: 24,
    marginBottom: 12,
    alignSelf: "flex-start"
  },

  /* wellness breakdown cards row */
  cardsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  card: {
    width: "31%",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  cardIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6
  },
  cardIcon: {
    fontSize: 16,
    fontWeight: "700"
  },
  cardScore: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 2
  },
  cardLabel: {
    fontSize: 14,
    color: "#2c3e36",
    marginTop: 2
  },
  cardSeverity: {
    fontSize: 13,
    color: "#2c8a57",
    marginTop: 2
  },

  /* recommended actions list rows */
  actionRow: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  actionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#d9f0df",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14
  },
  actionIconWrapBreath: {
    backgroundColor: "#cfe8db"
  },
  actionIconText: {
    fontSize: 20
  },
  actionTextWrap: {
    flex: 1
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1c3a2e"
  },
  actionSubtitle: {
    fontSize: 13,
    color: "#6b7a74",
    marginTop: 2
  },
  ctaBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10
  },
  ctaBtnText: {
    color: "#ffffffff",
    fontSize: 14
  }
});

export default styles;