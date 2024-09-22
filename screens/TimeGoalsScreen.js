import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import TimeGoalCard from "../components/TimeGoalCard";

const TimeGoalsScreen = ({ navigation }) => {
  const handleGoalPress = (goal) => {
    navigation.navigate("GoalDetails", { goal });
  };

  return (
    <View style={styles.container}>
      <TimeGoalCard
        title="Ten tydzień:"
        goals={[
          "Ukończyć prezentację na piątek",
          "Przeczytać 50 stron książki",
        ]}
        onGoalPress={handleGoalPress}
      />
      <TimeGoalCard
        title="Ten miesiąc:"
        goals={[
          "Zacząć kurs online z programowania",
          "Zrobić 3 sesje treningowe w tygodniu",
        ]}
        onGoalPress={handleGoalPress}
      />
      <TimeGoalCard
        title="3 miesiące:"
        goals={["Ukończyć kurs z certyfikatem", "Zaoszczędzić 1000 PLN"]}
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
