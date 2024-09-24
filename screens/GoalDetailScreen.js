import * as React from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  IconButton,
  Button,
  Divider,
  Title,
  Paragraph,
} from "react-native-paper";
import { TimeGoalsContext } from "../context/TimeGoalContext";
import { useContext, useState } from "react";
import EditTimeGoalForm from "../components/EditTimeGoalForm";
import BackArrow from "../components/BackArrow";

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
      <BackArrow />
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.titleContainer}>
            <Title style={styles.title}>{goal.title}</Title>
            <IconButton
              icon="close"
              size={28}
              iconColor="#f5f5f5"
              onPress={handleDelete}
              style={styles.deleteButton}
            />
          </View>
          <Divider style={styles.divider} />
          <Paragraph style={styles.details}>Opis: {goal.description}</Paragraph>
          <Paragraph style={styles.details}>Termin: {goal.deadline}</Paragraph>
        </Card.Content>
      </Card>
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <EditTimeGoalForm goal={goal} onEditGoal={handleEditGoal} />
        ) : (
          <Button
            icon="pencil"
            mode="contained"
            onPress={() => setIsEditing(true)}
            style={styles.editButton}
            labelStyle={styles.editButtonLabel}
          >
            Edytuj
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#a91d3a",
    borderRadius: 12,
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 12,
    backgroundColor: "#ffffff",
  },
  details: {
    fontSize: 16,
    color: "#f0f0f0",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#a91d3a", // Red background for edit button
    width: "60%",
    borderRadius: 25,
  },
  editButtonLabel: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  deleteButton: {
    borderRadius: 20,
  },
});

export default GoalDetailsScreen;
