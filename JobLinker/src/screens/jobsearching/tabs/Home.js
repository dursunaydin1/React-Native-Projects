import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {BG_COLOR, TEXT_COLOR} from '../../../utils/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import CustomSolidBtn from '../../../components/CustomSolidBtn';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    const type = await AsyncStorage.getItem('USER_TYPE');
    if (id != null && type != null) {
      if (type == 'user') {
        setIsLogin(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.searchBox}
        onPress={() => {
          navigation.navigate('SearchJob');
        }}>
        <Image
          source={require('../../../images/search.png')}
          style={styles.icon}
        />
        <Text style={styles.placeholder}>İş ara..</Text>
      </TouchableOpacity>
      {!isLogin && (
        <View>
          <Text style={styles.heading}>
            {'İyi bir iş bulmaya bir adım kaldı'}
          </Text>

          <View style={styles.notes}>
            <Image
              source={require('../../../images/star.png')}
              style={styles.icon}
            />
            <Text style={styles.note}>
              {'Hesap oluşturduktan sonra işleri bul'}
            </Text>
          </View>

          <View style={styles.notes}>
            <Image
              source={require('../../../images/star.png')}
              style={styles.icon}
            />
            <Text style={styles.note}>
              {'İşverenle doğrudan iletişime geç'}
            </Text>
          </View>

          <View style={styles.btnsView}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => navigation.navigate('LoginForUser')}>
              <Text style={styles.btnText}>Giriş Yap</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => navigation.navigate('SignupForUser')}>
              <Text style={styles.btnText}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.jobSearchCard}>
        <Image
          source={require('../../../images/search-gif.gif')}
          style={styles.gif}
        />
        <TextInput style={styles.input} placeholder="Pozisyon Adı Girin" />
        <TextInput
          style={[styles.input, {marginTop: moderateScale(10)}]}
          placeholder="Şirket Adı Girin"
        />
        <CustomSolidBtn title={'İş Ara..'} onClick={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    alignItems: 'center',
    paddingTop: moderateVerticalScale(30),
  },
  searchBox: {
    width: '90%',
    height: verticalScale(40),
    borderWidth: 0.5,
    borderRadius: moderateScale(30),
    borderColor: '#9e9e9e',
    flexDirection: 'row',
    paddingLeft: moderateScale(15),
    alignItems: 'center',
    marginBottom: moderateVerticalScale(20),
  },
  icon: {
    width: scale(16),
    height: scale(16),
    tintColor: 'gray',
  },
  placeholder: {
    marginLeft: moderateScale(10),
    color: 'gray',
  },
  heading: {
    color: TEXT_COLOR,
    fontWeight: '700',
    fontSize: moderateScale(22),
    marginBottom: moderateVerticalScale(20),
  },
  notes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(10),
  },
  note: {marginLeft: moderateScale(10)},
  btnsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: moderateVerticalScale(20),
  },
  loginBtn: {
    width: '48%',
    height: verticalScale(40),
    backgroundColor: TEXT_COLOR, // Buton rengi burada ayarlanıyor
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpBtn: {
    width: '48%',
    height: verticalScale(40),
    backgroundColor: TEXT_COLOR, // Buton rengi burada ayarlanıyor
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    color: 'white',
  },
  jobSearchCard: {
    width: '90%',
    backgroundColor: '#f2f2f2',
    paddingVertical: moderateVerticalScale(20),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },
  gif: {
    width: scale(50),
    height: scale(50),
    marginBottom: moderateVerticalScale(20),
  },
  input: {
    width: '100%',
    height: verticalScale(40),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateVerticalScale(10),
  },
});

export default Home;
