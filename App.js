import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ekran Główny</Text>
    </View>
  );
}

function GoalsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Twoje Cele</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ustawienia</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Appbar.Header style={styles.header}>
          <Appbar.Content title="Goal Tracker" />
        </Appbar.Header>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Goals") {
                iconName = "list";
              } else if (route.name === "Settings") {
                iconName = "settings";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarStyle: { backgroundColor: "#a91d3a" },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "#151515",
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Goals" component={GoalsScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

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
