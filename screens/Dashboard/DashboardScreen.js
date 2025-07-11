import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Pets</Text>
      {/* TODO: Show list of pets here */}
      <Button
        title="Add New Pet"
        onPress={() => navigation.navigate("AddPet")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
