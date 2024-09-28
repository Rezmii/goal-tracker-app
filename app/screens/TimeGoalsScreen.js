import * as React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import TimeGoalCard from "../components/TimeGoalCard";
import AddTimeGoalForm from "../components/AddTimeGoalForm";
import { TimeGoalsContext } from "../context/TimeGoalContext";
import { useContext, useState } from "react";
import { getTimeRemaining } from "../utils/timeUtils";

const TimeGoalsScreen = ({ navigation }) => {
  const { goals } = useContext(TimeGoalsContext);
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);

  const handleGoalPress = (goal) => {
    navigation.navigate("GoalDetails", { goal });
  };

  const filterGoalsByTimePeriod = (timePeriod) => {
    return goals.filter((goal) => goal.timePeriod === timePeriod);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {showAddGoalForm ? (
          <AddTimeGoalForm
            onAddGoal={() => {
              setShowAddGoalForm(false);
            }}
          />
        ) : (
          <Button
            mode="contained"
            style={styles.addButton}
            onPress={() => setShowAddGoalForm(true)}
          >
            Dodaj nowy cel
          </Button>
        )}

        <TimeGoalCard
          title={`Ten tydzień: (${getTimeRemaining("week")})`}
          goals={filterGoalsByTimePeriod("ten tydzień")}
          onGoalPress={handleGoalPress}
          timePeriod="week"
        />
        <TimeGoalCard
          title={`Ten miesiąc: (${getTimeRemaining("month")})`}
          goals={filterGoalsByTimePeriod("ten miesiąc")}
          onGoalPress={handleGoalPress}
          timePeriod="month"
        />
        <TimeGoalCard
          title={`3 miesiące: (${getTimeRemaining("quarter")})`}
          goals={filterGoalsByTimePeriod("3 miesiące")}
          onGoalPress={handleGoalPress}
          timePeriod="quarter"
        />
        <TimeGoalCard
          title={`Rok: (${getTimeRemaining("year")})`}
          goals={filterGoalsByTimePeriod("rok")}
          onGoalPress={handleGoalPress}
          timePeriod="year"
        />
        <TimeGoalCard
          title={`3 lata: (${getTimeRemaining("threeYears")})`}
          goals={filterGoalsByTimePeriod("3 lata")}
          onGoalPress={handleGoalPress}
          timePeriod="threeYears"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#151515",
  },
  container: {
    padding: 16,
  },
  addButton: {
    backgroundColor: "#a91d3a",
    marginBottom: 16,
  },
});

export default TimeGoalsScreen;
