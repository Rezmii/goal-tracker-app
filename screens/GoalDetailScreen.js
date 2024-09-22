import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const GoalDetailsScreen = ({ route }) => {
  const { goal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Szczegóły Celu</Text>
      <Text style={styles.goal}>{goal}</Text>
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
  goal: {
    fontSize: 18,
    color: "#eeeeee",
  },
});

export default GoalDetailsScreen;
