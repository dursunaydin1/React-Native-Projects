//import liraries
import React, { Component } from "react";
import { Text, TouchableOpacity, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
// create a component
const Index = () => {
  return (
    <TouchableOpacity>
      <Image />
      <Text></Text>
    </TouchableOpacity>
  );
};

//make this component available to the app
export default Index;
