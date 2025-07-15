import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useEffect } from "react";
import { Platform, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import DashboardScreen from "./screens/Dashboard/DashboardScreen";
import AddPetScreen from "./screens/AddPet/AddPetScreen";
import RemindersScreen from "./screens/Reminders/RemindersScreen";
import AddReminderScreen from "./screens/Reminders/AddReminderScreen";

const Stack = createNativeStackNavigator();

// Configure notification handler to show alerts while app is foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    // Request permissions on mount
    const registerForPushNotifications = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          Alert.alert("Failed to get push token for push notification!");
          return;
        }
      } else {
        Alert.alert("Must use physical device for Push Notifications");
      }
    };

    registerForPushNotifications();
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
