import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f0f2dff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  welcomeText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#a476a3ff", // Soft purple
    marginBottom: 70,
    textAlign: "center",
  },
  list: {
    paddingBottom: 140, // leave space for button
  },
  card: {
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#bb86fc",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#e0c3fc", // lighter purple
  },
  type: {
    fontSize: 14,
    color: "#d1b3ff", // lighter purple variant
    marginTop: 4,
  },
  addButton: {
    position: "absolute",
    bottom: 90, // raised up from bottom so not over system nav bar
    right: 20,
    backgroundColor: "rgba(187, 134, 252, 0.5)", // translucent purple
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#bb86fc",
    shadowColor: "#bb86fc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
