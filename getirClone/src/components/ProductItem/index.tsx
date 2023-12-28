import React from "react";
import { Dimensions, Image, Text, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Product } from "../../models";

const { width, height } = Dimensions.get("window");

type productItemType = {
  item: Product;
};
const ProductItem = ({ item }: productItemType) => {
  return (
    <TouchableOpacity
      style={{
        width: width * 0.3,
        marginTop: 12,
        height: height * 0.25,
        marginLeft: 10,
        marginBottom: 6,
      }}
    >
      <Image
        style={{
          width: width * 0.3,
          height: width * 0.28,
          borderRadius: 12,
          borderWidth: 0.2,
          borderColor: "gray",
        }}
        source={{
          uri: item.image,
        }}
      />
      <View
        style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}
      >
        <Text
          style={{
            fontSize: 11.5,
            color: "#747990",
            textDecorationLine: "line-through",
          }}
        >
          {"\u20BA"}
          {item.fiyat}
        </Text>
        <Text
          style={{
            color: "#5D3EBD",
            fontWeight: "bold",
            fontSize: 12,
            marginLeft: 4,
          }}
        >
          {"\u20BA"}
          {item.fiyatIndirimli}
        </Text>
      </View>
      <Text style={{ fontSize: 12, fontWeight: "600", marginTop: 5 }}>
        {item.name}
      </Text>
      <Text
        style={{
          color: "#747990",
          fontSize: 12,
          marginTop: 4,
          fontWeight: "500",
        }}
      >
        {item.miktar}
      </Text>
      <View
        style={{
          width: 30,
          height: 30,
          borderWidth: 0.3,
          borderColor: "lightgrey",
          backgroundColor: "white",
          position: "absolute",
          right: -6,
          top: -6,
          borderRadius: 6,
          alignItems: "center",
          justifyContent: "center",
          shadowRadius: 3.8,
          shadowOpacity: 0.05,
        }}
      >
        <Entypo name="plus" size={22} color="#5D3EBD" />
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
