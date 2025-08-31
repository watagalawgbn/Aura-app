import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  titleWrapper: {
    marginTop: 65,
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  /* ---- Grid ---- */
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  /* Each card occupies roughly half width; height is fixed */
  halfCard: {
    width: "48%",
    height: 230,
    borderRadius: 18,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#000",
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },

  /* Image fills the card */
  cardImage: {
    width: "100%",
    height: "100%",
  },

  /* Title + phrase */
  textWrap: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
  },
  cardTitleBig: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    marginBottom: 2,
  },
  cardSubtitle: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.95,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },

  /* Dim & centered play icon shown on hover/press */
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  playPill: {
    backgroundColor: "#fff",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  /* Legacy styles kept (unused here) in case other screens reference them */
  fullCard: { marginBottom: 15, borderRadius: 15, overflow: "hidden" },
  fullCardImage: { width: "100%", height: 180, borderRadius: 15 },
  halfCardImage: { width: "100%", height: 120, borderRadius: 15 },
  playButtonContainer: { position: "absolute", bottom: 10, right: 10 },
  playButton: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    position: "absolute",
    bottom: 15,
    left: 15,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  cardTitleSmall: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default styles;
