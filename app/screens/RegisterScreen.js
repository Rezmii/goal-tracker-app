import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button, Title, HelperText } from "react-native-paper";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://192.168.1.116:3000/register", {
        email,
        password,
      });
      navigation.navigate("Login");
    } catch (err) {
      setError("Błąd rejestracji, spróbuj ponownie.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#151515",
      }}
    >
      <Title style={styles.titleText}>Zarejestruj się</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ marginBottom: 10 }}
        mode="outlined"
        theme={{ colors: { primary: "#a91d3a" } }}
      />
      <TextInput
        label="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10 }}
        mode="outlined"
        theme={{ colors: { primary: "#a91d3a" } }}
      />
      <HelperText type="error" visible={error}>
        {error}
      </HelperText>
      <Button
        mode="contained"
        onPress={handleRegister}
        style={{ backgroundColor: "#a91d3a", marginTop: 10 }}
      >
        Zarejestruj się
      </Button>
      <Text
        style={{ color: "white", textAlign: "center", marginTop: 20 }}
        onPress={() => {
          if (error) setError("");
          navigation.navigate("Login");
        }}
      >
        Masz już konto? Zaloguj się!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    textAlign: "center",
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
