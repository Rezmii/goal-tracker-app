import * as React from "react";
import { Card, Text, IconButton } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TimeGoalsContext } from "../context/TimeGoalContext";
import { useContext, useState } from "react";
import moment from "moment";

const TimeGoalCard = ({ title, goals, onGoalPress, timePeriod }) => {
  const { toggleGoalDone, deleteGoal } = useContext(TimeGoalsContext);
  const [isDateVisible, setIsDateVisible] = useState(false);

  const calculateEndDate = (period) => {
    const startDate = moment("2024-09-24", "YYYY-MM-DD");
    let endDate;

    switch (period) {
      case "week":
        endDate = startDate.add(1, "week");
        break;
      case "month":
        endDate = startDate.add(1, "month");
        break;
      case "quarter":
        endDate = startDate.add(3, "months");
        break;
      case "year":
        endDate = startDate.add(1, "year");
        break;
      case "threeYears":
        endDate = startDate.add(3, "years");
        break;
      default:
        return "Nieznana data";
    }

    return endDate.format("YYYY-MM-DD"); // Formatuj datę jako string
  };

  const handleTitlePress = () => {
    setIsDateVisible((prev) => !prev); // Zmień stan na przeciwny
  };

  const displayText = isDateVisible
    ? title.replace(/\(.*?\)/, `(${calculateEndDate(timePeriod)})`) // Zastąp tekst w nawiasach
    : title;

  return (
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
              onPress={() => deleteGoal(goal.id)}
              style={styles.deleteButton}
            />
          </View>
        ))}
      </Card.Content>
    </Card>
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
  deleteButton: {
    marginLeft: 8,
  },
});

export default TimeGoalCard;
