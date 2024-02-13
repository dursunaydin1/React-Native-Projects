import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';

const SignupForUser = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [badName, setBadName] = useState('');
  const [email, setEmail] = useState('');
  const [badEmail, setBadEmail] = useState('');
  const [contact, setContact] = useState('');
  const [badContact, setBadContact] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [badCompanyName, setBadCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [badAddress, setBadAddress] = useState('');
  const [password, setPassword] = useState('');
  const [badPassword, setBadPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const validate = () => {
    let nameRegex = /^[a-zA-Z\s]+$/u;
    let validEmail = true;
    let validName = true;
    let validContact = true;
    let validCompany = true;
    let validAddress = true;
    let validPass = true;

    // İsim doğrulama
    if (name === '') {
      validName = false;
      setBadName('Lütfen İsim Giriniz!');
    } else if (name.length < 3 || !nameRegex.test(name)) {
      validName = false;
      setBadName('Lütfen geçerli bir isim giriniz!');
    } else {
      validName = true;
      setBadName('');
    }

    // Email doğrulama
    let emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/u;
    if (email === '') {
      validEmail = false;
      setBadEmail('Lütfen email giriniz!');
    } else if (!emailRegex.test(email)) {
      validEmail = false;
      setBadEmail('Lütfen geçerli bir email giriniz!');
    } else {
      validEmail = true;
      setBadEmail('');
    }

    // İletişim bilgisi doğrulama
    let contactRegex = /^\d+$/;
    if (contact === '') {
      validContact = false;
      setBadContact('Lütfen iletişim bilgisi giriniz!');
    } else if (contact.length < 10 || !contactRegex.test(contact)) {
      validContact = false;
      setBadContact('Lütfen geçerli bir iletişim bilgisi giriniz!');
    } else {
      validContact = true;
      setBadContact('');
    }

    // Şifre doğrulama
    if (password === '') {
      validPass = false;
      setBadPassword('Lütfen şifreyi giriniz!');
    } else if (password.length < 6) {
      validPass = false;
      setBadPassword('Lütfen şifreyi minimum 6 karakter giriniz!');
    } else {
      validPass = true;
      setBadPassword('');
    }

    // Tüm alanlar doğrulandı mı?
    return validName && validEmail && validContact && validPass;
  };

  const regisredUser = () => {
    setLoading(true);
    firestore()
      .collection('users')
      .add({
        name,
        email,
        contact,
        address,
        companyName,
        password,
      })
      .then(() => {
        setName('');
        setEmail('');
        setPassword('');
        setContact('');
        setAccountCreated(true);
        setLoading(false);
        setTimeout(() => {
          navigation.navigate('LoginForUser');
        }, 3000);
      })

      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {!accountCreated ? (
        <ScrollView>
          <Image
            source={require('../../images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Hesap Oluştur</Text>
          <CustomTextInput
            value={name}
            onChangeText={txt => setName(txt)}
            title={'İsim'}
            placeholder={'abc'}
            bad={badName != '' ? true : false}
          />
          {badName != '' && <Text style={styles.errorMsg}>{badName}</Text>}
          <CustomTextInput
            value={email}
            onChangeText={txt => setEmail(txt)}
            title={'Email'}
            placeholder={'abc@gmail.com'}
            bad={badEmail != '' ? true : false}
          />
          {badEmail != '' && <Text style={styles.errorMsg}>{badEmail}</Text>}
          <CustomTextInput
            value={contact}
            onChangeText={txt => setContact(txt)}
            title={'İletişim'}
            placeholder={'123'}
            bad={badContact != '' ? true : false}
          />
          {badContact != '' && (
            <Text style={styles.errorMsg}>{badContact}</Text>
          )}

          <CustomTextInput
            value={password}
            onChangeText={txt => setPassword(txt)}
            title={'Şifre'}
            placeholder={'******'}
            bad={badPassword != '' ? true : false}
          />
          {badPassword != '' && (
            <Text style={styles.errorMsg}>{badPassword}</Text>
          )}
          <CustomSolidBtn
            title={'Kayıt Ol'}
            onClick={() => {
              if (validate()) {
                regisredUser();
              }
            }}
          />
          <CustomBorderBtn
            title={'Giriş'}
            onClick={() => {
              navigation.navigate('LoginForUser');
            }}
          />
          <Loader visible={loading} />
        </ScrollView>
      ) : (
        <View style={styles.doneView}>
          <Image
            style={styles.logo}
            source={require('../../images/checked.png')}
          />
          <Text style={styles.title}>{'Account Created'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignupForUser;

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
  doneView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
