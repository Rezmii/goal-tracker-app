import * as React from "react";
import { Card, Text, IconButton } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TimeGoalsContext } from "../context/TimeGoalContext";
import { useContext } from "react";

const TimeGoalCard = ({ title, goals, onGoalPress }) => {
  const { toggleGoalDone, deleteGoal } = useContext(TimeGoalsContext);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.sectionTitle}>{title}</Text>
        {goals.map((goal, index) => (
          <>
            <View style={styles.flexContainer}>
              <View style={styles.goalContainer}>
                <IconButton
                  icon={goal.done ? "check-circle" : "circle-outline"}
                  size={20}
                  iconColor="white"
                  onPress={() => toggleGoalDone(goal.id)}
                />
                <TouchableOpacity key={index} onPress={() => onGoalPress(goal)}>
                  <Text style={[styles.goal, goal.done && styles.doneGoal]}>
                    {goal.title}
                  </Text>
                </TouchableOpacity>
              </View>

              <IconButton
                icon="trash-can"
                size={20}
                iconColor="white"
                onPress={() => deleteGoal(goal.id)}
                style={styles.deleteButton}
              />
            </View>
          </>
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
    margin: -9,
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  goal: {
    fontSize: 16,
    color: "#eeeeee",
    marginLeft: -8,
  },
  doneGoal: {
    textDecorationLine: "line-through",
    color: "#bfbfbf",
  },
});

export default TimeGoalCard;
