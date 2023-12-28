//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import categoriesGetir from "../../../assets/categoriesGetir";
import CategoryItem from "../../components/CategoryItem/index";
import { Category } from "../../models";

// create a component
const Index = () => {
  const [categories, setCategories] = useState<Category[]>(categoriesGetir);
  return (
    <View>
      <View style={styles.listContainer}>
        {categories.map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
});

//make this component available to the app
export default Index;
