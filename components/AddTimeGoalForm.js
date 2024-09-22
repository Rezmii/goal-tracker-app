import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  TextInput,
  Button,
  Menu,
  Divider,
  IconButton,
} from "react-native-paper";
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
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Dodaj nowy cel</Text>
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
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TextInput
            label="Termin"
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
          Dodaj nowy cel
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
    fontSize: 24, // Size of the header text
    color: "white", // Color of the header text
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#252525", // Darker background for inputs
    color: "white", // Text color for better readability
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
