import * as React from "react";
import {
  Card,
  Text,
  IconButton,
  Dialog,
  Paragraph,
  Button,
  Portal,
} from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TimeGoalsContext } from "../context/TimeGoalContext";
import { useContext, useState } from "react";
import moment from "moment";
import DeleteGoalDialog from "./DeleteGoalDialog";

const TimeGoalCard = ({ title, goals, onGoalPress, timePeriod }) => {
  const { toggleGoalDone, deleteGoal } = useContext(TimeGoalsContext);
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  const confirmDelete = (goalId) => {
    setGoalToDelete(goalId);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (goalToDelete) {
      deleteGoal(goalToDelete); // Usuń cel na podstawie jego ID
    }
    setIsModalVisible(false);
    setGoalToDelete(null); // Zresetuj stan
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setGoalToDelete(null); // Zresetuj stan
  };

  const calculateEndDate = (period) => {
    const startDate = moment("24.09.2024", "DD.MM.YYYY");
    let endDate;

    switch (period) {
      case "week":
        endDate = startDate.add(1, "week");
        return endDate.format("DD.MM"); // Wyświetl tylko dzień i miesiąc
      case "month":
        endDate = startDate.add(1, "month");
        return endDate.format("DD.MM"); // Wyświetl tylko dzień i miesiąc
      case "quarter":
        endDate = startDate.add(3, "months");
        return endDate.format("DD.MM"); // Wyświetl tylko dzień i miesiąc
      case "year":
        endDate = startDate.add(1, "year");
        return endDate.format("DD.MM.YYYY"); // Wyświetl pełną datę
      case "threeYears":
        endDate = startDate.add(3, "years");
        return endDate.format("DD.MM.YYYY"); // Wyświetl pełną datę
      default:
        return "Nieznana data";
    }
  };

  const handleTitlePress = () => {
    setIsDateVisible((prev) => !prev); // Zmień stan na przeciwny
  };

  const displayText = isDateVisible
    ? title.replace(/\(.*?\)/, `(${calculateEndDate(timePeriod)})`) // Zastąp tekst w nawiasach
    : title;

  return (
    <>
      <Card style={styles.card}>
        <Card.Content>
          <TouchableOpacity onPress={handleTitlePress}>
            <Text style={styles.sectionTitle}>{displayText}</Text>
          </TouchableOpacity>
          {goals.map((goal, index) => (
            <View key={index} style={styles.flexContainer}>
              <View style={styles.goalContainer}>
                <IconButton
                  icon={goal.done ? "check-circle" : "circle-outline"}
                  size={22}
                  iconColor="white"
                  onPress={() => toggleGoalDone(goal.id)}
                />
                <TouchableOpacity
                  style={styles.touchableGoal}
                  onPress={() => onGoalPress(goal)}
                >
                  <Text
                    style={[
                      styles.goal,
                      goal.done && styles.doneGoal,
                      goal.priority && styles.priorityGoal,
                    ]}
                  >
                    {goal.title}
                  </Text>
                </TouchableOpacity>
              </View>
              <IconButton
                icon="trash-can"
                size={22}
                iconColor="white"
                onPress={() => confirmDelete(goal._id)}
                style={styles.deleteButton}
              />
            </View>
          ))}
        </Card.Content>
      </Card>
      <DeleteGoalDialog
        visible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#a91d3a",
  },
  sectionTitle: {
    fontSize: 20,
    color: "#eeeeee",
    marginBottom: 8,
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: -5,
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  touchableGoal: {
    flex: 1,
  },
  goal: {
    fontSize: 18,
    color: "#eeeeee",
    marginLeft: -8,
  },
  doneGoal: {
    textDecorationLine: "line-through",
    color: "#bfbfbf",
  },
  priorityGoal: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#a91d3a",
    paddingHorizontal: 6,
  },
  deleteButton: {
    marginLeft: 8,
  },
  dialog: {
    backgroundColor: "rgb(21, 21, 21)", // Tło dialogu
  },
  dialogTitle: {
    color: "#eeeeee", // Kolor tytułu dialogu
  },
  dialogParagraph: {
    color: "#eeeeee", // Kolor tekstu w treści dialogu
    fontSize: 16,
  },
});

export default TimeGoalCard;
