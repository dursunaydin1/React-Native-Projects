import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import products from "../data/products";
import Navigation from "../navigation/navigation";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/productsSlice";

const ProductsScreen = ({ navigation }) => {
  const productsList = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const onPressProduct = (selectedProduct) => {
    dispatch(productsSlice.actions.setSelectedProduct(selectedProduct.id));
    navigation.navigate("Product Details");
  };

  return (
    <FlatList
      data={productsList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPressProduct(item)}
          style={styles.itemContainer}
        >
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  itemContainer: { width: "50%", padding: 1 },
});
