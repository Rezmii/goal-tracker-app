import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./context/AuthContext"; // Import kontekstu
import HomeScreen from "./screens/HomeScreen";
import TimeGoalsScreen from "./screens/TimeGoalsScreen";
import LevelGoalsScreen from "./screens/LevelGoalsScreen";
import GeneralGoalsScreen from "./screens/GeneralGoalsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import GoalDetailsScreen from "./screens/GoalDetailScreen";
import LoginScreen from "./screens/LoginScreen"; // Upewnij się, że masz ten import
import RegisterScreen from "./screens/RegisterScreen"; // Upewnij się, że masz ten import

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TimeGoals" component={TimeGoalsScreen} />
      <Stack.Screen name="LevelGoals" component={LevelGoalsScreen} />
      <Stack.Screen name="GeneralGoals" component={GeneralGoalsScreen} />
      <Stack.Screen name="GoalDetails" component={GoalDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Sprawdź token w AsyncStorage przy starcie aplikacji
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkToken();
  }, []);

  return isAuthenticated ? (
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
  ) : (
    <AuthStack />
  );
}
