import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const GoalDetailsScreen = ({ route }) => {
  const { goal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Szczegóły Celu</Text>
      <Text style={styles.detail}>Tytuł: {goal.title}</Text>
      <Text style={styles.detail}>Opis: {goal.description}</Text>
      <Text style={styles.detail}>Termin: {goal.deadline}</Text>
      <Text style={styles.detail}>Postęp: {goal.progress}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151515",
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "#eeeeee",
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    color: "#eeeeee",
    marginBottom: 10,
  },
});

export default GoalDetailsScreen;
