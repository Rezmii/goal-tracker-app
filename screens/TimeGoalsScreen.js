import * as React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import TimeGoalCard from "../components/TimeGoalCard";
import AddTimeGoalForm from "../components/AddTimeGoalForm";
import { TimeGoalsContext } from "../context/TimeGoalContext";
import { useContext, useState } from "react";

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
        <TimeGoalCard
          title="rok:"
          goals={filterGoalsByTimePeriod("rok")}
          onGoalPress={handleGoalPress}
        />
        <TimeGoalCard
          title="3 lata:"
          goals={filterGoalsByTimePeriod("3 lata")}
          onGoalPress={handleGoalPress}
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
