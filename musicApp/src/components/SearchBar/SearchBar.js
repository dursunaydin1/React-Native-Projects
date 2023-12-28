import React from 'react';
import {TextInput, View} from 'react-native';
import styles from './SearchBar.styles';
const SearchBar = ({onSearch}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Ara..."
        style={styles.searchTitle}
        onChangeText={onSearch}
      />
    </View>
  );
};

export default SearchBar;
