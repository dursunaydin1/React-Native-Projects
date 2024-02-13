import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import {BG_COLOR, TEXT_COLOR} from '../utils/Colors';

const CustomSolidBtn = ({title, onClick}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => onClick()}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomSolidBtn;

const styles = StyleSheet.create({
  btn: {
    width: '90%',
    height: verticalScale(45),
    backgroundColor: TEXT_COLOR,
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: BG_COLOR,
    fontWeight: '500',
    fontSize: moderateScale(16),
  },
});
