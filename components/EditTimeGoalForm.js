import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, IconButton } from "react-native-paper";
import { TimeGoalsContext } from "../context/TimeGoalContext";

const EditTimeGoalForm = ({ goal, onEditGoal }) => {
  const { updateGoal } = useContext(TimeGoalsContext);
  const [title, setTitle] = useState(goal.title || "");
  const [description, setDescription] = useState(goal.description || "");
  const [deadline, setDeadline] = useState(goal.deadline || "");
  const [timePeriod, setTimePeriod] = useState(goal.timePeriod || "");

  useEffect(() => {
    setTitle(goal.title);
    setDescription(goal.description);
    setDeadline(goal.deadline);
    setTimePeriod(goal.timePeriod);
  }, [goal]);

  const handleEditGoal = () => {
    const updatedGoal = { ...goal, title, description, deadline, timePeriod };
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
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#a91d3a",
  },
});

export default EditTimeGoalForm;
