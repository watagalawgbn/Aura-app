import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const CIRCLE_SIZE = width * 0.5;
const PROGRESS_CIRCLE_SIZE = CIRCLE_SIZE + 100; // Progress ring is larger
const PROGRESS_RADIUS = (PROGRESS_CIRCLE_SIZE - 20) / 2;

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
  circle2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#52AE77",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleWrapper: {
    marginTop: 65,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  circleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    width: PROGRESS_CIRCLE_SIZE,
    height: PROGRESS_CIRCLE_SIZE,
    alignSelf: "center",
  },
  svgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ rotate: "-90deg" }],
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  phaseText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  timer: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#000",
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 25,
  },
  button: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#5FB21F",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default styles;