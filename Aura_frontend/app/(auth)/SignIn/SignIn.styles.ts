import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: { width: 120, height: 100, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    width: "100%",
  },
  icon: { marginRight: 10 },
  input: { flex: 1 },
  forgotPassword: {
    marginRight: 230,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: "#555",
    fontWeight: "regular",
  },
  googleButton: {
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    padding: 5,
  },
  googleText: { color: "#333" },
  mainButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  googleContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  mainButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  footer: { marginTop: 10 },
  link: { color: "#4CAF50", fontWeight: "500" },
});

export default styles;