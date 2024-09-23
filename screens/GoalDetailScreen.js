import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { TimeGoalsContext } from "../context/TimeGoalContext";
import { useContext, useState } from "react";
import EditTimeGoalForm from "../components/EditTimeGoalForm";

const GoalDetailsScreen = ({ route, navigation }) => {
  const { goal: initialGoal } = route.params;
  const { deleteGoal } = useContext(TimeGoalsContext);
  const [goal, setGoal] = useState(initialGoal);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    deleteGoal(goal.id);
    navigation.goBack();
  };

  const handleEditGoal = (updatedGoal) => {
    setGoal(updatedGoal);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <>
        <IconButton
          icon="trash-can"
          size={30}
          iconColor="white"
          onPress={handleDelete}
          style={styles.deleteButton}
        />
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>{goal.title}</Text>
            <Text style={styles.details}>Szczegóły celu:</Text>
            <Text style={styles.goal}>Opis: {goal.description}</Text>
            <Text style={styles.goal}>Termin: {goal.deadline}</Text>
          </Card.Content>
        </Card>
        <View style={styles.buttonContainer}>
          {isEditing ? (
            <EditTimeGoalForm goal={goal} onEditGoal={handleEditGoal} />
          ) : (
            <IconButton
              icon="pencil"
              size={30}
              iconColor="white"
              onPress={() => setIsEditing(true)}
              style={styles.editButton}
            />
          )}
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#a91d3a",
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "#eeeeee",
    marginBottom: 20,
    textAlign: "center",
  },
  details: {
    fontSize: 22,
    color: "#eeeeee",
    marginBottom: 10,
  },
  goal: {
    fontSize: 18,
    color: "#eeeeee",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#a91d3a",
  },
  deleteButton: {
    backgroundColor: "#a91d3a",
  },
});

export default GoalDetailsScreen;
