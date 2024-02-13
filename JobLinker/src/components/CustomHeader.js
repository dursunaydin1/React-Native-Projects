import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const CustomHeader = ({title, onBackPress}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          onBackPress();
        }}>
        <Image source={require('../images/back.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: verticalScale(45),
    flexDirection: 'row',
    paddingLeft: moderateScale(15),
    alignItems: 'center',
  },
  icon: {
    width: scale(24),
    height: scale(24),
  },
  title: {
    fontSize: moderateScale(18),
    marginLeft: moderateScale(10),
  },
});
