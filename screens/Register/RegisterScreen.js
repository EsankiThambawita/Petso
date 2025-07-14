import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./RegisterScreenStyles";

import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      setSuccessModal(true);
      setEmail("");
      setPassword("");
    } catch (error) {
      let msg = "Something went wrong.";
      if (error.code === "auth/email-already-in-use") {
        msg = "This email is already in use.";
      } else if (error.code === "auth/invalid-email") {
        msg = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters.";
      }
      setErrorMsg(msg);
      setErrorModal(true);
    }
  };

  return (
    <LinearGradient colors={["#1B1464", "#4B0082"]} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Image source={require("../../assets/pets.jpg")} style={styles.logo} />
        <View style={styles.formCard}>
          <Text style={styles.title}>Create Your Account 🐾</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text style={styles.loginLink}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* ✅ Success Modal */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={successModal}
          onRequestClose={() => setSuccessModal(false)}
        >
          <View style={modalStyles.modalBackground}>
            <View style={modalStyles.modalContainer}>
              <Text style={modalStyles.successText}>
                🎉 Registration Successful!
              </Text>
              <TouchableOpacity
                style={modalStyles.okButton}
                onPress={() => {
                  setSuccessModal(false);
                  navigation.replace("Dashboard");
                }}
              >
                <Text style={modalStyles.okButtonText}>Go to Dashboard</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* ❌ Error Modal */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={errorModal}
          onRequestClose={() => setErrorModal(false)}
        >
          <View style={modalStyles.modalBackground}>
            <View style={modalStyles.modalContainer}>
              <Text style={modalStyles.errorText}>⚠️ {errorMsg}</Text>
              <TouchableOpacity
                style={modalStyles.okButton}
                onPress={() => setErrorModal(false)}
              >
                <Text style={modalStyles.okButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4B0082",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#B00020", // reddish warning color
    textAlign: "center",
  },
  okButton: {
    backgroundColor: "#4B0082",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  okButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
