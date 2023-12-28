import React, { useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");

const TypeBox = ({
  setCat,
  item,
  active,
}: {
  setCat: any;
  item: string;
  active: string;
}) => {
  return (
    <TouchableOpacity
      onPress={() => setCat(item)}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          marginRight: 12,
          borderRadius: 6,
          height: height * 0.044,
        },
        item === active
          ? { backgroundColor: "#5C3EBC" }
          : { borderColor: "#6B7287", borderWidth: 1.3 },
      ]}
    >
      <Text
        style={[
          { fontSize: 12, color: "#7849F7", fontWeight: "600" },
          item === active && { color: "white" },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};

const TypeFiltering = () => {
  const [Category, setCategory] = useState<String>("Birlikte İyi Gider");
  return (
    <ScrollView
      style={{
        width: "100%",
        height: height * 0.075,
        flexDirection: "row",
        paddingVertical: height * 0.014,
        backgroundColor: "white",
        paddingHorizontal: 12,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
      }}
      showsHorizontalScrollIndicator={false}
      bounces={true}
      horizontal={true}
    >
      {["Birlikte İyi Gider", "Çubuk", "Kutu", "Külah", "Çoklu", "Bar"].map(
        (item) => (
          <TypeBox setCat={setCategory} item={item} active={Category} />
        )
      )}
    </ScrollView>
  );
};

export default TypeFiltering;
