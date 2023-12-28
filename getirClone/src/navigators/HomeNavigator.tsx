import { View, Text, Image } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CategoryFilterScreen from "../screens/CategoryFilterScreen";

const Stack = createStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: "#5C3EBC" },
          headerTitle: () => (
            <Image
              source={require("../../assets/getirlogo.png")}
              style={{ width: 70, height: 30 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CategoryDetails"
        component={CategoryFilterScreen}
        options={{
          headerTintColor: "white",
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: "#5C3EBC" },
          headerTitle: () => (
            <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>
              Ürünler
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
