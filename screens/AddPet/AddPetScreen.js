import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { auth, db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function AddPetScreen({ navigation }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Dog");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Please enter your pet's name");
      return;
    }

    setUploading(true);

    try {
      const user = auth.currentUser;

      await addDoc(collection(db, "pets"), {
        name,
        type,
        ownerId: user.uid,
        createdAt: new Date(),
      });

      setUploading(false);
      Alert.alert("Success", `${type} named ${name} added!`, [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      setUploading(false);
      Alert.alert("Failed to add pet", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Pet</Text>

      <TextInput
        placeholder="Pet's Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[styles.typeButton, type === "Dog" && styles.typeSelected]}
          onPress={() => setType("Dog")}
        >
          <Text
            style={[styles.typeText, type === "Dog" && styles.typeTextSelected]}
          >
            Dog
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === "Cat" && styles.typeSelected]}
          onPress={() => setType("Cat")}
        >
          <Text
            style={[styles.typeText, type === "Cat" && styles.typeTextSelected]}
          >
            Cat
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={uploading}
      >
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Add Pet</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a1257",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#bb86fc",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#3a2166",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 15 : 10,
    fontSize: 18,
    color: "#fff",
    marginBottom: 25,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  typeButton: {
    borderWidth: 2,
    borderColor: "#bb86fc",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    borderRadius: 30,
  },
  typeSelected: {
    backgroundColor: "#bb86fc",
  },
  typeText: {
    fontSize: 18,
    color: "#bb86fc",
  },
  typeTextSelected: {
    color: "#2a1257",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "rgba(187, 134, 252, 0.8)",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#2a1257",
    fontSize: 20,
    fontWeight: "bold",
  },
});
