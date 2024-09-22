import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./screens/HomeScreen";
import TimeGoalsScreen from "./screens/TimeGoalsScreen";
import LevelGoalsScreen from "./screens/LevelGoalsScreen";
import GeneralGoalsScreen from "./screens/GeneralGoalsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import GoalDetailsScreen from "./screens/GoalDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stworzymy stos nawigacyjny dla HomeScreen i jego pod-ekranów
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Ukryj header dla Home
      />
      <Stack.Screen
        name="TimeGoals"
        component={TimeGoalsScreen}
        options={{
          title: "Time Goals",
          headerStyle: { backgroundColor: "#a91d3a" },
          headerTintColor: "#eeeeee", // Kolor tekstu w nagłówku
        }}
      />
      <Stack.Screen
        name="LevelGoals"
        component={LevelGoalsScreen}
        options={{
          title: "3 Level Goals",
          headerStyle: { backgroundColor: "#a91d3a" },
          headerTintColor: "#eeeeee",
        }}
      />
      <Stack.Screen
        name="GeneralGoals"
        component={GeneralGoalsScreen}
        options={{
          title: "General Goals",
          headerStyle: { backgroundColor: "#a91d3a" },
          headerTintColor: "#eeeeee",
        }}
      />
      <Stack.Screen
        name="GoalDetails"
        component={GoalDetailsScreen}
        options={{
          title: "Szczegóły Celu",
          headerStyle: { backgroundColor: "#a91d3a" },
          headerTintColor: "#eeeeee",
        }}
      />
    </Stack.Navigator>
  );
}

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
              if (route.name === "HomeStack") {
                iconName = "home";
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
          {/* HomeStack obsługuje HomeScreen i inne ekrany celów */}
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{ title: "Home" }}
          />
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
