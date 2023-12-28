//import liraries
import React from "react";
import { ScrollView } from "react-native";
import HeaderMain from "../../components/HeaderMain/index";
import BannerCarousel from "../../components/BannerCarousel";
import MainCategories from "../../components/MainCategories";

// create a component
const Index = () => {
  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <HeaderMain />
      <BannerCarousel />
      <MainCategories />
    </ScrollView>
  );
};

//make this component available to the app
export default Index;
