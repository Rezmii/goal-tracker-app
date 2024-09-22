import * as React from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";

const TimeGoalCard = ({ title, goals, onGoalPress }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.sectionTitle}>{title}</Text>
        {goals.map((goal, index) => (
          <TouchableOpacity key={index} onPress={() => onGoalPress(goal)}>
            <Text style={styles.goal}>• {goal}</Text>
          </TouchableOpacity>
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
  goal: {
    fontSize: 16,
    color: "#eeeeee",
    marginBottom: 4,
  },
});

export default TimeGoalCard;
