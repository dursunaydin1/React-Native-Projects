import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BG_COLOR, TEXT_COLOR} from '../../utils/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const CustomDrawer = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    const type = await AsyncStorage.getItem('USER_TYPE');
    const mName = await AsyncStorage.getItem('NAME');
    const mEmail = await AsyncStorage.getItem('EMAIL');
    if (id != null && type != null) {
      if (type == 'user') {
        setIsLogin(true);
        setName(mName);
        setEmail(mEmail);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toView}>
        <Image
          source={require('../../images/account.png')}
          style={styles.profile}
        />
        <View>
          <Text style={[styles.heading, {width: isLogin ? '100%' : '60%'}]}>
            {isLogin ? name : 'Profilini Oluştur'}
          </Text>
          <Text style={styles.sub_heading}>
            {isLogin ? email : 'Seni Bekleyen İş Fırsatları'}
          </Text>
        </View>
      </View>
      {!isLogin && (
        <View style={styles.btnsView}>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={[styles.btnText, {color: BG_COLOR}]}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpBtn}>
            <Text style={styles.btnText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.seperator}></View>
      <FlatList
        contentContainerStyle={{marginTop: moderateScale(50)}}
        data={[
          {
            title: 'Kayıtlı İşler',
            icon: require('../../images/star.png'),
          },
          {
            title: 'Değerlendirin',
            icon: require('../../images/contact-mail.png'),
          },
          {
            title: 'Tema',
            icon: require('../../images/theme.png'),
          },
        ]}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                if (index == 0) {
                  navigation.closeDrawer();
                  navigation.navigate('SavedJobs');
                }
              }}>
              <View style={styles.menuItemView}>
                <Image source={item.icon} style={styles.meuItemIcon} />
                <Text style={styles.heading}>{item.title}</Text>
              </View>
              <Image
                source={require('../../images/right-arrow.png')}
                style={styles.meuItemIcon}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  profile: {
    width: scale(50),
    height: scale(50),
    marginLeft: moderateScale(10),
  },
  toView: {
    marginTop: moderateScale(20),
    flexDirection: 'row',
  },
  heading: {
    fontSize: 18,
    width: '70%',
    marginLeft: moderateScale(10),
    fontWeight: '700',
  },
  sub_heading: {
    fontSize: moderateScale(10),
    width: '60%',
    marginLeft: moderateScale(10),
    marginTop: moderateScale(4),
  },
  btnsView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: moderateVerticalScale(20),
  },
  loginBtn: {
    width: '40%',
    height: verticalScale(30),
    backgroundColor: TEXT_COLOR,
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpBtn: {
    width: '40%',
    height: verticalScale(30),
    backgroundColor: TEXT_COLOR,
    borderWidth: 1,
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '500',
    fontSize: moderateScale(15),
    color: BG_COLOR,
  },
  seperator: {
    width: '90%',
    height: verticalScale(0.5),
    backgroundColor: '#9e9e9e',
    opacity: 0.5,
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  menuItem: {
    width: '90%',
    height: verticalScale(40),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meuItemIcon: {
    width: scale(15),
    height: scale(15),
  },
});
