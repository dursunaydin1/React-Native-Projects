//import liraries
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../misc/colors';

// create a component
const RoundIconBtn = ({antIconName, size, color, style, onPress}) => {
  return (
    <Icon
      name={antIconName}
      size={size || 24}
      color={color || colors.LIGHT}
      style={[styles.icon, {...style}]}
      onPress={onPress}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  icon: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});

//make this component available to the app
export default RoundIconBtn;
