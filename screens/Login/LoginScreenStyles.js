import { StyleSheet } from "react-native";

export default StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 30,
    color: "#E0E0E0", // light grayish text for contrast
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // translucent white
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#6A0DAD", // shiny purple button
    width: "100%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 15,
    shadowColor: "#6A0DAD",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  registerText: {
    color: "#ccc",
    fontSize: 16,
  },
  registerLink: {
    color: "#BB86FC", // pastel purple
    fontWeight: "700",
  },
});
