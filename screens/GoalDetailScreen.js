import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
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
import DeleteGoalDialog from "../components/DeleteGoalDialog";

const GoalDetailsScreen = ({ route, navigation }) => {
  const { goal: initialGoal } = route.params;
  const { deleteGoal } = useContext(TimeGoalsContext);
  const [goal, setGoal] = useState(initialGoal);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  const confirmDelete = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    deleteGoal(goal.id);

    setIsModalVisible(false);

    navigation.goBack();
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setGoalToDelete(null); // Zresetuj stan
  };

  const handleEditGoal = (updatedGoal) => {
    setGoal(updatedGoal);
    setIsEditing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={{ backgroundColor: "#151515" }}
    >
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
                onPress={confirmDelete}
                style={styles.deleteButton}
              />
            </View>
            <Divider style={styles.divider} />
            <Paragraph style={styles.details}>
              Opis: {goal.description}
            </Paragraph>
            <Paragraph style={styles.details}>
              Termin: {goal.deadline}
            </Paragraph>
            <View style={styles.priorityContainer}>
              <Paragraph style={[styles.priorityDetails, { marginRight: 2 }]}>
                Priorytet:
              </Paragraph>
              <IconButton
                icon={
                  goal.priority
                    ? "checkbox-marked-circle" // pełne kółko, gdy priorytet jest true
                    : "checkbox-blank-circle-outline" // puste kółko, gdy priorytet jest false
                }
                size={20}
                iconColor="#f5f5f5"
                onPress={() => {}} // Opcjonalnie można dodać funkcję zmiany priorytetu
                style={styles.priorityIcon}
              />
            </View>
            <View style={styles.priorityContainer}>
              <Paragraph style={styles.priorityDetails}>Zrobione:</Paragraph>
              <IconButton
                icon={
                  goal.done
                    ? "checkbox-marked-circle" // pełne kółko, gdy priorytet jest true
                    : "checkbox-blank-circle-outline" // puste kółko, gdy priorytet jest false
                }
                size={20}
                iconColor="#f5f5f5"
                onPress={() => {}} // Opcjonalnie można dodać funkcję zmiany priorytetu
                style={styles.priorityIcon}
              />
            </View>
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
      <DeleteGoalDialog
        visible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Wyśrodkowanie w pionie
    backgroundColor: "#151515",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#121212",
    padding: 20,
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
  priorityDetails: { fontSize: 16, color: "#f0f0f0" },
  priorityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#a91d3a", // Czerwone tło dla przycisku edycji
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
