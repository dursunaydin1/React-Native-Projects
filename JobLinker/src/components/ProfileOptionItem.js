import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {TEXT_COLOR} from '../utils/Colors';

const ProfileOptionItem = ({title, icon, onClick}) => {
  return (
    <TouchableOpacity
      style={{
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateVerticalScale(20),
      }}
      onPress={() => {
        onClick();
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={icon} style={{width: scale(20), height: scale(20)}} />
        <Text
          style={{
            marginLeft: moderateScale(15),
            fontSize: moderateScale(18),
            color: TEXT_COLOR,
          }}>
          {title}
        </Text>
      </View>
      <Image
        source={require('../images/next.png')}
        style={{width: scale(10), height: scale(10)}}
      />
    </TouchableOpacity>
  );
};

export default ProfileOptionItem;

const styles = StyleSheet.create({});
