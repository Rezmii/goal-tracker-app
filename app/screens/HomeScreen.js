import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext); // Access user attributes

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Witaj, {user?.email}</Text>
      {/* Show user email */}
      <Text style={styles.title}>Twoje Cele</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate("TimeGoals")}
        >
          Cele Czasowe
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate("LevelGoals")}
        >
          Cele 3 Poziomowe
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate("GeneralGoals")}
        >
          Cele Ogólne
        </Button>
      </View>
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
  welcomeText: {
    fontSize: 18,
    color: "#eeeeee",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#eeeeee",
  },
  buttonContainer: {
    width: "50%",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#a91d3a",
    width: "100%",
  },
});

export default HomeScreen;
