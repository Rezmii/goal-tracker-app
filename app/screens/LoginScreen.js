import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button, Title, HelperText } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.1.116:3000/login", {
        email,
        password,
      });
      const { token, user } = response.data; // Assume your API returns a user object
      await AsyncStorage.setItem("token", token);
      setIsAuthenticated(true);
      setUser(user); // Save user details to context
      console.log(user);
      navigation.navigate("HomeStack", { screen: "Home" });
    } catch (err) {
      setError("Błąd logowania, sprawdź dane.");
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
      <Title style={styles.titleText}>Zaloguj się</Title>
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
        onPress={handleLogin}
        style={{ backgroundColor: "#a91d3a", marginTop: 10 }}
      >
        Zaloguj się
      </Button>
      <Text
        style={{ color: "white", textAlign: "center", marginTop: 20 }}
        onPress={() => {
          if (error) setError("");
          navigation.navigate("Register");
        }}
      >
        Nie masz konta? Zarejestruj się!
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

export default LoginScreen;
