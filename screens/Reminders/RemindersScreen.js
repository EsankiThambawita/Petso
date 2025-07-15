import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons"; // ✅ import icons

export default function RemindersScreen({ route, navigation }) {
  const { petId, petName } = route.params;
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const remindersRef = collection(db, "reminders");
    const q = query(
      remindersRef,
      where("petId", "==", petId),
      orderBy("date", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const reminderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReminders(reminderList);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading reminders:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [petId]);

  const handleDelete = async (reminderId) => {
    Alert.alert("Delete Reminder", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "reminders", reminderId));
          } catch (error) {
            console.error("Failed to delete reminder:", error);
          }
        },
      },
    ]);
  };

  const renderReminder = ({ item }) => {
    const reminderDate = new Date(item.date).toDateString();
    return (
      <View style={styles.reminderCard}>
        <View>
          <Text style={styles.reminderTask}>{item.task}</Text>
          <Text style={styles.reminderDate}>{reminderDate}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#ff6b6b" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient colors={["#1a0a3c", "#0d0219"]} style={styles.container}>
      <Text style={styles.title}>{petName}’s Reminders</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddReminder", { petId, petName })}
      >
        <Text style={styles.addButtonText}>+ Add Reminder</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#bb86fc" />
      ) : reminders.length === 0 ? (
        <Text style={styles.noRemindersText}>No reminders found. Add one!</Text>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          renderItem={renderReminder}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7a797bff",
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: "rgba(197, 143, 233, 0.8)",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#080115ff",
    fontSize: 20,
    fontWeight: "bold",
  },
  noRemindersText: {
    color: "#bb86fc",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  list: {
    paddingBottom: 20,
  },
  reminderCard: {
    backgroundColor: "rgba(187, 134, 252, 0.15)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reminderTask: {
    color: "#bb86fc",
    fontSize: 20,
    fontWeight: "bold",
  },
  reminderDate: {
    color: "#d3c6f5",
    fontSize: 16,
    marginTop: 5,
  },
});
