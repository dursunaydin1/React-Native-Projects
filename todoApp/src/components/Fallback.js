import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    width: 300,
  },
});

const Fallback = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/todo.jpg")} style={styles.image} />
      <Text>Start Adding Your Task</Text>
    </View>
  );
};

export default Fallback;
