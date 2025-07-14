// firebaseConfig.js

import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCS-5u4MXYQsnDx8u6tC4mWvjWXP75Q91w",
  authDomain: "petso-7a030.firebaseapp.com",
  projectId: "petso-7a030",
  storageBucket: "petso-7a030.appspot.com",
  messagingSenderId: "453668009363",
  appId: "1:453668009363:web:c223bc2676889a201ea466",
};

// Prevent re-initialization
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Important: Use `initializeAuth()` only once with AsyncStorage
import { getAuth } from "firebase/auth";
import { Platform } from "react-native";

let auth;
if (Platform.OS === "web") {
  auth = getAuth(app); // Web
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Firestore
const db = getFirestore(app);

export { auth, db };
