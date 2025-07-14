import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import styles from "./DashboardScreenStyles";

const pets = [
  {
    id: "1",
    name: "Luna",
    type: "Dog",
    image: require("../../assets/Golden-Retriever.webp"),
  },
  {
    id: "2",
    name: "Milo",
    type: "Cat",
    image: require("../../assets/orange-cat.jpg"),
  },
];

export default function DashboardScreen() {
  const navigation = useNavigation();

  const renderPet = ({ item }) => (
    <BlurView intensity={90} tint="dark" style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => alert(`Open ${item.name}'s profile`)}
      >
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.type}>{item.type}</Text>
        </View>
      </TouchableOpacity>
    </BlurView>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hey, Welcome! </Text>
      <FlatList
        data={pets}
        renderItem={renderPet}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddPet")}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+ Add New Pet</Text>
      </TouchableOpacity>
    </View>
  );
}
