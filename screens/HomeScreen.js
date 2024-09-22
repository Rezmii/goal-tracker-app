import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ekran Główny</Text>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("TimeGoals")}
      >
        Time Goals
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("LevelGoals")}
      >
        3 Level Goals
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("GeneralGoals")}
      >
        General Goals
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151515",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#eeeeee",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#a91d3a",
  },
});

export default HomeScreen;
