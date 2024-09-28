import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// Komponent BackButton
const BackArrow = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={30} color="white" />
      <Text style={styles.text}>Cofnij</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#121212",
    zIndex: 1,
  },
  text: {
    color: "white",
    marginLeft: 5,
    fontSize: 18,
  },
});

export default BackArrow;
