import React, { useEffect } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as Notifications from "expo-notifications";

import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import DashboardScreen from "./screens/Dashboard/DashboardScreen";
import AddPetScreen from "./screens/AddPet/AddPetScreen";
import RemindersScreen from "./screens/Reminders/RemindersScreen";
import AddReminderScreen from "./screens/Reminders/AddReminderScreen";

const Stack = createNativeStackNavigator();

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  // ✅ useEffect now inside the App function
  useEffect(() => {
    const registerForPush = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    };
    registerForPush();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPet"
          component={AddPetScreen}
          options={{
            headerShown: true,
            headerTitle: "",
            headerBackTitleVisible: false,
            headerTintColor: "#bb86fc",
            headerStyle: {
              backgroundColor: "#1B1464",
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="Reminders"
          component={RemindersScreen}
          options={{
            headerShown: true,
            headerTitle: "Reminders",
            headerBackTitleVisible: false,
            headerTintColor: "#bb86fc",
            headerStyle: {
              backgroundColor: "#1B1464",
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="AddReminder"
          component={AddReminderScreen}
          options={{
            headerShown: true,
            headerTitle: "Add Reminder",
            headerBackTitleVisible: false,
            headerTintColor: "#bb86fc",
            headerStyle: {
              backgroundColor: "#1B1464",
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
