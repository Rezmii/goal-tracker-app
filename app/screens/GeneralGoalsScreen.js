import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

const GeneralGoalsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Odkąd jesteśmy razem jestem najszczęśliwszy na świecie :D
      </Text>
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
  header: {
    backgroundColor: "#a91d3a",
  },
});

export default GeneralGoalsScreen;
