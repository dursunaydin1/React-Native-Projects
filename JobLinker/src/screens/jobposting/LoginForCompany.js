import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {BG_COLOR, TEXT_COLOR} from '../../utils/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import CustomTextInput from '../../components/CustomTextInput';
import CustomSolidBtn from '../../components/CustomSolidBtn';
import CustomBorderBtn from '../../components/CustomBorderBtn';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForCompany = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [badEmail, setBadEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badPassword, setBadPassword] = useState('');

  const validate = () => {
    let validEmail = true;
    let validPass = true;

    let emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/u;

    if (email == '') {
      validEmail = false;
      setBadEmail('Lütfen email giriniz!');
    } else if (email != '' && !email.toString().match(emailRegex)) {
      validEmail = false;
      setBadEmail('Lütfen geçerli bir email giriniz!');
    } else if (email != '' && email.toString().match(emailRegex)) {
      validEmail = true;
      setBadEmail('');
    }

    if (password == '') {
      validPass = false;
      setBadPassword('Lütfen şifreyi giriniz!');
    } else if (password != '' && password.length < 6) {
      validPass = false;
      setBadPassword('Lütfen şifreyi minimum 6 karakter giriniz!');
    } else if (password != '' && password.length >= 6) {
      validPass = true;
      setBadPassword('');
    }
    return validEmail && validPass;
  };

  const loginUser = () => {
    setLoading(true);
    firestore()
      .collection('job_posters')
      .where('email', '==', email)
      .get()
      .then(data => {
        setLoading(false);
        console.log(data.docs);
        if (data.docs.length > 0) {
          data.docs.forEach(item => {
            if (item.data().password === password) {
              setBadEmail('');
              setBadPassword('');
              goToNextScreen(item.id, item.data().email, item.data().name);
            } else {
              setBadPassword('Hatalı şifre');
            }
          });
        } else {
          setBadEmail('Bu e-posta ile ilişkili bir kullanıcı bulunamadı.');
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const goToNextScreen = async (id, email, name) => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USER_ID', id);
    await AsyncStorage.setItem('USER_TYPE', 'company');
    navigation.navigate('DashboardForCompany');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Giriş</Text>

      <CustomTextInput
        value={email}
        onChangeText={txt => setEmail(txt)}
        title={'Email'}
        placeholder={'abc@gmail.com'}
        bad={badEmail != '' ? true : false}
      />
      {badEmail != '' && <Text style={styles.errorMsg}>{badEmail}</Text>}

      <CustomTextInput
        value={password}
        onChangeText={txt => setPassword(txt)}
        title={'Şifre'}
        placeholder={'******'}
        bad={badPassword != '' ? true : false}
      />
      {badPassword != '' && <Text style={styles.errorMsg}>{badPassword}</Text>}
      <Text style={styles.fotgotPassword}>Şifremi Unuttum?</Text>
      <CustomSolidBtn
        title={'Giriş'}
        onClick={() => {
          if (validate()) {
            loginUser();
          }
        }}
      />
      <CustomBorderBtn
        onClick={() => {
          navigation.navigate('SignUpForCompany');
        }}
        title={'Kayıt Ol'}
      />
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default LoginForCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: scale(80),
    height: scale(80),
    alignSelf: 'center',
    marginTop: moderateVerticalScale(40),
  },
  title: {
    fontSize: moderateScale(25),
    alignSelf: 'center',
    fontWeight: '600',
    color: TEXT_COLOR,
    marginTop: moderateVerticalScale(50),
  },
  fotgotPassword: {
    alignSelf: 'flex-end',
    marginRight: moderateScale(20),
    marginTop: moderateVerticalScale(10),
    fontWeight: '500',
    fontSize: moderateScale(16),
    color: TEXT_COLOR,
  },
  errorMsg: {
    marginLeft: moderateScale(25),
    color: 'red',
  },
});
