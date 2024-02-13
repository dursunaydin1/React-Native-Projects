import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BG_COLOR, TEXT_COLOR} from '../../utils/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 3000);
  }, []);

  const getData = async () => {
    try {
      let type = await AsyncStorage.getItem('USER_TYPE');
      if (type !== null) {
        if (type === 'company') {
          navigation.navigate('DashboardForCompany');
        } else {
          navigation.navigate('JobSearchingNavigator');
        }
      } else {
        navigation.navigate('SelectUser');
      }
    } catch (error) {
      console.error('Error getting data:', error);
      navigation.navigate('SelectUser');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../images/logo.png')} style={styles.logo} />
      <Text style={styles.name}>İş Arama</Text>
      <Text style={styles.slogan}>Bir Yerden İş İlanı Ver ve Bul</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: scale(100),
    height: verticalScale(100),
  },
  name: {
    fontSize: moderateScale(35),
    fontWeight: '600',
    marginTop: moderateVerticalScale(10),
    color: TEXT_COLOR,
  },
  slogan: {
    fontSize: moderateScale(16),
    fontStyle: 'italic',
    position: 'absolute',
    bottom: moderateVerticalScale(80),
    fontWeight: '600',
  },
});

export default Splash;
