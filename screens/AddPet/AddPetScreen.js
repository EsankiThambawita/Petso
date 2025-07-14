import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddPetScreen({ navigation }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Dog");
  const [imageUri, setImageUri] = useState(null);

  // Request permission & pick image from gallery
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setImageUri(pickerResult.uri);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Please enter your pet's name");
      return;
    }
    if (!imageUri) {
      alert("Please add a picture of your pet");
      return;
    }
    // Save pet info logic here (e.g. upload to firestore)
    alert(`Added ${type} named ${name}!`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Pet 🐾</Text>

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

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.petImage} />
        ) : (
          <Text style={styles.imagePickerText}>Tap to add a picture</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Pet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a1257", // dark purple background
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
  imagePicker: {
    height: 200,
    borderRadius: 20,
    borderColor: "#bb86fc",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  imagePickerText: {
    color: "#bb86fc",
    fontSize: 16,
    fontStyle: "italic",
  },
  petImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  submitButton: {
    backgroundColor: "rgba(187, 134, 252, 0.8)", // translucent purple
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
