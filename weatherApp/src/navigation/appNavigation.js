import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  "Not-serializeble velues were found in the navigation state",
]);
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
