import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function AddPetScreen({ navigation }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  const savePet = () => {
    if (!name.trim() || !breed.trim()) {
      Alert.alert("Please enter both pet name and breed.");
      return;
    }
    // TODO: Save pet data to Firestore
    Alert.alert("Pet saved!", `Name: ${name}, Breed: ${breed}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pet Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Breed"
        style={styles.input}
        value={breed}
        onChangeText={setBreed}
      />
      <Button title="Save Pet" onPress={savePet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
