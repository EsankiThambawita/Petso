import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { auth, db } from "../../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import styles from "./DashboardScreenStyles";

// Local images for pet types
const defaultImages = {
  Dog: require("../../assets/dog-icon.jpg"),
  Cat: require("../../assets/cat-icon.png"),
};

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const petsQuery = query(
      collection(db, "pets"),
      where("ownerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      petsQuery,
      (querySnapshot) => {
        const petsList = [];
        querySnapshot.forEach((doc) => {
          petsList.push({ id: doc.id, ...doc.data() });
        });
        setPets(petsList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching pets: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const renderPet = ({ item }) => (
    <BlurView intensity={90} tint="dark" style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() =>
          navigation.navigate("Reminders", {
            petId: item.id,
            petName: item.name,
          })
        }
      >
        <Image source={defaultImages[item.type]} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.type}>{item.type}</Text>
        </View>
      </TouchableOpacity>
    </BlurView>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#bb86fc" />
      </View>
    );
  }

  if (pets.length === 0) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "#bb86fc", fontSize: 18 }}>
          No pets found. Add one!
        </Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hey, Welcome!</Text>
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
