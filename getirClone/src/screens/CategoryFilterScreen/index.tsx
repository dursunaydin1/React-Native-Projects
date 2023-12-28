import React, { useState } from "react";
import { ScrollView } from "react-native";
import CategoryFiltering from "../../components/CategoryFiltering";
import TypeFiltering from "../../components/TypeFiltering";
import { Category } from "../../models";
import ProductItem from "../../components/ProductItem";
import ProductContainer from "../../components/ProductContainer";

const Index = ({ route }) => {
  const [category, setCategory] = useState<Category>(route.params.category);

  return (
    <ScrollView>
      <CategoryFiltering category={category} />
      <TypeFiltering />
      <ProductContainer />
    </ScrollView>
  );
};

export default Index;
