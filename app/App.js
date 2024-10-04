import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { TimeGoalsProvider } from "./context/TimeGoalContext";
import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <TimeGoalsProvider>
        <PaperProvider>
          <NavigationContainer>
            <Appbar.Header style={{ backgroundColor: "#a91d3a" }}>
              <Appbar.Content title="Goal Tracker" />
            </Appbar.Header>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </TimeGoalsProvider>
    </AuthProvider>
  );
}
