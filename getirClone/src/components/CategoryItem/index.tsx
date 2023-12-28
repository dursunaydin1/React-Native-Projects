import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { Category } from "../../models";
import { useNavigation } from "@react-navigation/native";

const windowDimensions = Dimensions.get("window");
const { width, height } = windowDimensions;

type CategoryItemProps = {
  item: Category;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate("CategoryDetails", { category: item })}
      style={{
        width: width * 0.25,
        height: height * 0.12,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      <Image
        style={{ width: width * 0.18, height: width * 0.18, borderRadius: 8 }}
        source={{
          uri: item.src,
        }}
      />
      <Text style={{ fontSize: 12, color: "#616161", fontWeight: "500" }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
