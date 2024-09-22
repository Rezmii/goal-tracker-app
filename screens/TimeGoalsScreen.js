import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import TimeGoalCard from "../components/TimeGoalCard";
import TimeGoal from "../models/TimeGoal";

const TimeGoalsScreen = ({ navigation }) => {
  // Tworzymy cele z przypisanym timePeriod
  const goals = [
    new TimeGoal(
      "Ukończyć prezentację",
      "Prezentacja na piątek",
      "2024-09-29",
      50,
      "ten tydzień"
    ),
    new TimeGoal(
      "Przeczytać książkę",
      "50 stron książki",
      "2024-09-25",
      20,
      "ten tydzień"
    ),
    new TimeGoal(
      "Zacząć kurs online",
      "Kurs programowania",
      "2024-10-15",
      0,
      "ten miesiąc"
    ),
    new TimeGoal(
      "Zaoszczędzić 1000 PLN",
      "Oszczędności na lokacie",
      "2024-12-31",
      10,
      "3 miesiące"
    ),
  ];

  // Filtrowanie celów według timePeriod
  const filterGoalsByTimePeriod = (timePeriod) => {
    return goals.filter((goal) => goal.timePeriod === timePeriod);
  };

  const handleGoalPress = (goal) => {
    navigation.navigate("GoalDetails", { goal });
  };

  return (
    <View style={styles.container}>
      <TimeGoalCard
        title="Ten tydzień:"
        goals={filterGoalsByTimePeriod("ten tydzień")}
        onGoalPress={handleGoalPress}
      />
      <TimeGoalCard
        title="Ten miesiąc:"
        goals={filterGoalsByTimePeriod("ten miesiąc")}
        onGoalPress={handleGoalPress}
      />
      <TimeGoalCard
        title="3 miesiące:"
        goals={filterGoalsByTimePeriod("3 miesiące")}
        onGoalPress={handleGoalPress}
      />

      <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.button} onPress={() => {}}>
          Rok
        </Button>
        <Button mode="contained" style={styles.button} onPress={() => {}}>
          3 Lata
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#151515",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    marginTop: 16,
  },
  button: {
    backgroundColor: "#a91d3a",
    paddingHorizontal: 45,
  },
});

export default TimeGoalsScreen;
