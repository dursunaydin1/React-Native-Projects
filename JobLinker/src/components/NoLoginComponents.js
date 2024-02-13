import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BG_COLOR} from '../utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import CustomSolidBtn from './CustomSolidBtn';

const NoLoginComponents = ({heading, desc}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading ? heading : ''}</Text>
      <Text style={styles.desc}>{desc ? desc : ''}</Text>
      <CustomSolidBtn title={'Giriş'} onClick={() => {}} />
      <View style={styles.signUpView}>
        <Text style={styles.text1}>{'Hesabınız yok mu?'}</Text>
        <Text style={styles.text2}>{'Hesap oluştur'}</Text>
      </View>
    </View>
  );
};

export default NoLoginComponents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  heading: {
    fontSize: moderateScale(25),
    alignSelf: 'center',
    width: '90%',
    marginTop: moderateScale(100),
    fontWeight: '700',
    textAlign: 'center',
  },
  desc: {
    width: '80%',
    alignSelf: 'center',
    fontSize: moderateScale(12),
    textAlign: 'center',
    marginTop: moderateScale(10),
  },
  signUpView: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    marginTop: moderateScale(50),
    justifyContent: 'center',
  },
  text1: {
    fontWeight: '500',
    fontSize: moderateScale(16),
  },
  text2: {
    fontWeight: '700',
    fontSize: moderateScale(16),
    marginLeft: moderateScale(10),
  },
});
