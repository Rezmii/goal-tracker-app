import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Menu, Divider } from "react-native-paper";
import { TimeGoalsContext } from "../context/TimeGoalContext";
import TimeGoal from "../models/TimeGoal";

const AddTimeGoalForm = ({ onAddGoal }) => {
  const { addGoal } = useContext(TimeGoalsContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [visible, setVisible] = useState(false);

  const handleAddGoal = () => {
    const newGoal = new TimeGoal(title, description, deadline, timePeriod);
    addGoal(newGoal);
    onAddGoal();
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectTimePeriod = (period) => {
    setTimePeriod(period);
    closeMenu();
  };

  const handleCloseForm = () => {
    setTitle("");
    setDescription("");
    setDeadline("");
    setTimePeriod("");
    onAddGoal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dodaj nowy cel</Text>
      <TextInput
        label="Title"
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
        label="Description"
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
        label="Deadline"
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
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TextInput
            label="Time Period"
            value={timePeriod}
            onPressIn={openMenu}
            style={styles.input}
            theme={{
              colors: {
                primary: "#a91d3a",
                background: "#151515",
                onSurfaceVariant: "white",
              },
            }}
            textColor="white"
            editable={false}
          />
        }
      >
        {["ten tydzień", "ten miesiąc", "3 miesiące", "rok", "3 lata"].map(
          (period) => (
            <Menu.Item
              key={period}
              onPress={() => selectTimePeriod(period)}
              title={period}
              style={styles.menuItem}
              titleStyle={styles.menuItemText}
            />
          )
        )}
        <Divider />
      </Menu>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleAddGoal} style={styles.button}>
          Add Goal
        </Button>
        <Button
          mode="contained"
          onPress={handleCloseForm}
          style={styles.closeButton}
        >
          Close
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
  header: {
    fontSize: 24, // Size of the header text
    color: "white", // Color of the header text
    marginBottom: 16, // Space below the header
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#252525", // Darker background for inputs
    color: "white", // Text color for better readability
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#a91d3a", // Match the theme color
    flex: 1,
    marginRight: 8,
  },
  closeButton: {
    backgroundColor: "#a91d3a",
    flex: 1,
  },
  menuItem: {
    backgroundColor: "#252525", // Black background for menu items
  },
  menuItemText: {
    color: "white", // White text color for menu items
  },
});

export default AddTimeGoalForm;
