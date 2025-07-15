import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const tasks = ["Vaccinations", "Grooming", "Worming"];

export default function AddReminderScreen({ route, navigation }) {
  const { petId, petName } = route.params;

  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [saving, setSaving] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = async () => {
    try {
      const reminderDoc = await addDoc(collection(db, "reminders"), {
        petId,
        petName,
        task: selectedTask,
        date: date.toISOString(),
        createdAt: new Date(),
      });

      // Schedule local notification 5 days before the reminder date
      const reminderTime = new Date(date);
      const notificationTime = new Date(reminderTime);
      notificationTime.setDate(notificationTime.getDate() - 5);

      if (notificationTime > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${petName}'s ${selectedTask} is coming up!`,
            body: `${selectedTask} is scheduled for ${reminderTime.toDateString()}`,
          },
          trigger: notificationTime,
        });
      }

      Alert.alert("Reminder Saved", "Notification scheduled!");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving reminder:", error);
      Alert.alert("Error", "Could not save reminder");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Reminder for {petName}</Text>

      <Text style={styles.label}>Select Task:</Text>
      <View style={styles.taskContainer}>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task}
            style={[
              styles.taskButton,
              selectedTask === task && styles.taskSelected,
            ]}
            onPress={() => setSelectedTask(task)}
            disabled={saving}
          >
            <Text
              style={[
                styles.taskText,
                selectedTask === task && styles.taskTextSelected,
              ]}
            >
              {task}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Select Date:</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
        disabled={saving}
      >
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()}
        />
      )}

      <TouchableOpacity
        style={[styles.saveButton, saving && { opacity: 0.7 }]}
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? "Saving..." : "Save Reminder"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1464",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fdfcffff",
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    color: "#bb86fc",
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  taskButton: {
    borderWidth: 2,
    borderColor: "#bb86fc",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  taskSelected: {
    backgroundColor: "#bb86fc",
  },
  taskText: {
    color: "#bb86fc",
    fontSize: 16,
  },
  taskTextSelected: {
    color: "#1B1464",
    fontWeight: "bold",
  },
  dateButton: {
    borderWidth: 2,
    borderColor: "#bb86fc",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 40,
  },
  dateText: {
    fontSize: 18,
    color: "#bb86fc",
  },
  saveButton: {
    backgroundColor: "#bb86fc",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#1B1464",
    fontSize: 20,
    fontWeight: "bold",
  },
});
