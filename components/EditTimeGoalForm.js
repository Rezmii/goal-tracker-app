import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, IconButton, Switch } from "react-native-paper";
import { TimeGoalsContext } from "../context/TimeGoalContext";

const EditTimeGoalForm = ({ goal, onEditGoal }) => {
  const { updateGoal } = useContext(TimeGoalsContext);
  const [title, setTitle] = useState(goal.title || "");
  const [description, setDescription] = useState(goal.description || "");
  const [deadline, setDeadline] = useState(goal.deadline || "");
  const [timePeriod, setTimePeriod] = useState(goal.timePeriod || "");
  const [priority, setPriority] = useState(goal.priority || false); // New state for priority

  useEffect(() => {
    setTitle(goal.title);
    setDescription(goal.description);
    setDeadline(goal.deadline);
    setTimePeriod(goal.timePeriod);
    setPriority(goal.priority || false); // Ensure priority is set when editing
  }, [goal]);

  const handleEditGoal = () => {
    const updatedGoal = {
      ...goal,
      title,
      description,
      deadline,
      timePeriod,
      priority,
    }; // Include priority
    updateGoal(goal.id, updatedGoal);
    onEditGoal(updatedGoal);
  };

  const handleCloseForm = () => {
    onEditGoal(goal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Edytuj cel</Text>
        <IconButton
          icon="close"
          mode="contained"
          size={18}
          onPress={handleCloseForm}
          iconColor="white"
          containerColor="#a91d3a"
        />
      </View>
      <TextInput
        label="Tytuł"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        theme={{
          colors: {
            primary: "#a91d3a",
            background: "#151515",
            onSurfaceVariant: "white",
          },
        }}
        textColor="white"
        placeholderTextColor="white"
      />
      <TextInput
        label="Opis"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        theme={{
          colors: {
            primary: "#a91d3a",
            background: "#151515",
            onSurfaceVariant: "white",
          },
        }}
        textColor="white"
      />
      <TextInput
        label="Termin"
        value={deadline}
        onChangeText={setDeadline}
        style={styles.input}
        theme={{
          colors: {
            primary: "#a91d3a",
            background: "#151515",
            onSurfaceVariant: "white",
          },
        }}
        textColor="white"
      />

      {/* Priority Switch */}
      <View style={styles.priorityContainer}>
        <Text style={styles.priorityLabel}>Priorytet:</Text>
        <Switch
          value={priority}
          onValueChange={() => setPriority(!priority)}
          color="#a91d3a"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleEditGoal} style={styles.button}>
          Zapisz zmiany
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#151515",
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    color: "white",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#252525",
    color: "white",
  },
  priorityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  priorityLabel: {
    fontSize: 16,
    color: "white",
    marginRight: 8,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#a91d3a",
  },
});

export default EditTimeGoalForm;
