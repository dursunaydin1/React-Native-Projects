import React, { useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { Category } from "../../models";
import categoriesGetir from "../../../assets/categoriesGetir";

const CategoryBox = ({
  item,
  active,
}: {
  item: Category;
  active: Category;
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 9,
        flexDirection: "row",
        alignItems: "center",
        ...(item.name === active.name && {
          borderBottomColor: "#FFD00C",
          borderWidth: 2.5,
        }),
      }}
    >
      <Text style={{ fontSize: 14, color: "white", fontWeight: "600" }}>
        {item.name}
      </Text>
    </View>
  );
};
const { width, height } = Dimensions.get("window");
const Index = ({ category }: { category: Category }) => {
  const [categories, setCategories] = useState<Category[]>(categoriesGetir);
  return (
    <ScrollView
      style={{
        width: "100%",
        backgroundColor: "#7849F7",
        height: height * 0.065,
      }}
      showsHorizontalScrollIndicator={false}
      bounces={true}
      horizontal={true}
    >
      {categories.map((item) => (
        <CategoryBox key={item.id} item={item} active={category} />
      ))}
    </ScrollView>
  );
};

export default Index;
