import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BG_COLOR, TEXT_COLOR} from '../../utils/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

const SelectUser = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('../../images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Ne Yapmak İstiyorsun?</Text>
      <TouchableOpacity
        style={styles.wantToHire}
        onPress={() => navigation.navigate('JobPostingNavigator')}>
        <Text style={styles.btnTxt1}>Bir Adayı İşe Almak İstiyorum</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.wantToJob}
        onPress={() => {
          navigation.navigate('JobSearchingNavigator');
        }}>
        <Text style={styles.btnTxt2}>İş Bulmak İstiyorum</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '600',
  },
  wantToHire: {
    width: '90%',
    height: verticalScale(45),
    backgroundColor: TEXT_COLOR,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
  },
  wantToJob: {
    width: '90%',
    height: verticalScale(45),
    backgroundColor: BG_COLOR,
    borderColor: TEXT_COLOR,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
  },

  btnTxt1: {
    color: BG_COLOR,
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  btnTxt2: {
    color: TEXT_COLOR,
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  logo: {
    width: scale(100),
    height: scale(100),
    marginBottom: moderateVerticalScale(50),
  },
});
