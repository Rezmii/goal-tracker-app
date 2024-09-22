import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./screens/HomeScreen";
import TimeGoalsScreen from "./screens/TimeGoalsScreen";
import LevelGoalsScreen from "./screens/LevelGoalsScreen";
import GeneralGoalsScreen from "./screens/GeneralGoalsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import GoalDetailsScreen from "./screens/GoalDetailScreen";
import { TimeGoalsProvider } from "./context/TimeGoalContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TimeGoals" component={TimeGoalsScreen} />
      <Stack.Screen name="LevelGoals" component={LevelGoalsScreen} />
      <Stack.Screen name="GeneralGoals" component={GeneralGoalsScreen} />
      <Stack.Screen name="GoalDetails" component={GoalDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <TimeGoalsProvider>
      <PaperProvider>
        <NavigationContainer>
          <Appbar.Header style={{ backgroundColor: "#a91d3a" }}>
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
            <Tab.Screen
              name="HomeStack"
              component={HomeStack}
              options={{ title: "Home" }}
            />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </TimeGoalsProvider>
  );
}
