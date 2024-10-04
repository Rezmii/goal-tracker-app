import * as React from "react";
import { useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

const SettingsScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ustawienia</Text>
      <Button title="Wyloguj się" onPress={logout} />
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

export default SettingsScreen;
