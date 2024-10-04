import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  TextInput,
  Button,
  Menu,
  Divider,
  IconButton,
  Switch,
} from "react-native-paper";
import { TimeGoalsContext } from "../context/TimeGoalContext";
import { AuthContext } from "../context/AuthContext";

const AddTimeGoalForm = ({ onAddGoal }) => {
  const { addGoal } = useContext(TimeGoalsContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [priority, setPriority] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleAddGoal = () => {
    const newGoal = {
      title,
      description,
      endDate: "2024-09-29",
      timePeriod,
      priority,
    };
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
    setEndDate("");
    setTimePeriod("");
    setPriority(false);
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#a91d3a",
    flex: 1,
    marginRight: 8,
  },
  closeButton: {
    backgroundColor: "#a91d3a",
    flex: 1,
  },
  menuItem: {
    backgroundColor: "#252525",
  },
  menuItemText: {
    color: "white",
  },
});

export default AddTimeGoalForm;
