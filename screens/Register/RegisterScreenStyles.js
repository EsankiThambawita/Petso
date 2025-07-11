import { StyleSheet } from "react-native";

export default StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    transform: [{ scale: 1.1 }],
  },
  formCard: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 25,
    borderRadius: 20,
    backdropFilter: "blur(10px)",
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#A020F0",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginText: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
  },
  loginLink: {
    color: "#FFBBEC",
    fontWeight: "bold",
  },
});
