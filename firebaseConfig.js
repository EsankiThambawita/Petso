import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCS-5u4MXYQsnDx8u6tC4mWvjWXP75Q91w",
  authDomain: "petso-7a030.firebaseapp.com",
  projectId: "petso-7a030",
  storageBucket: "petso-7a030.appspot.com",
  messagingSenderId: "453668009363",
  appId: "1:453668009363:web:c223bc2676889a201ea466",
};

// Initialize Firebase app once
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize auth once
let auth;

if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Firestore
const db = getFirestore(app);

export { auth, db };
