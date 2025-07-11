import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import DashboardScreen from "./screens/Dashboard/DashboardScreen";
import AddPetScreen from "./screens/AddPet/AddPetScreen";

const Stack = createNativeStackNavigator();

export default function App() {
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
          options={{ headerLeft: null, title: "Your Pets" }}
        />
        <Stack.Screen
          name="AddPet"
          component={AddPetScreen}
          options={{ title: "Add New Pet" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
