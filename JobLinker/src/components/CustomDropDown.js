import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {BG_COLOR} from '../utils/Colors';

const CustomDropDown = ({title, placeholder, onClick, bad}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onClick();
      }}
      style={[styles.input, {borderColor: bad ? 'red' : '#9e9e9e'}]}>
      <Text style={[styles.title, {borderColor: bad ? 'red' : 'black'}]}>
        {title}
      </Text>
      <Text style={{color: placeholder.includes('seç') ? '#9e9e9e' : 'black'}}>
        {placeholder}
      </Text>
      <Image source={require('../images/down-arrow.png')} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: verticalScale(42),
    borderWidth: 0.4,
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: moderateScale(20),
    top: -moderateVerticalScale(8),
    position: 'absolute',
    backgroundColor: BG_COLOR,
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
  },
  icon: {
    width: scale(10),
    height: scale(10),
  },
});
