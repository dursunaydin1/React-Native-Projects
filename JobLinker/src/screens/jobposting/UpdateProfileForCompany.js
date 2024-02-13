import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateProfileForCompany = () => {
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

    // Şirket bilgisi doğrulama
    if (companyName === '') {
      validCompany = false;
      setBadCompanyName('Lütfen şirket bilgisi giriniz!');
    } else {
      validCompany = true;
      setBadCompanyName('');
    }

    // Adres bilgisi doğrulama
    if (address === '') {
      validAddress = false;
      setBadAddress('Lütfen adres bilgisi giriniz!');
    } else {
      validAddress = true;
      setBadAddress('');
    }

    // Tüm alanlar doğrulandı mı?
    return (
      validName && validEmail && validCompany && validAddress && validContact
    );
  };

  const updatedUser = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    setLoading(true);
    firestore()
      .collection('job_posters')
      .doc(id)
      .update({
        name,
        email,
        contact,
        address,
        companyName,
      })
      .then(async () => {
        await AsyncStorage.setItem('NAME', name);
        navigation.goBack();
      })

      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const mEmail = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('job_posters')
      .where('email', '==', mEmail)
      .get()
      .then(res => {
        res.docs.forEach(item => {
          setName(item.data().name);
          setEmail(item.data().email);
          setContact(item.data().contact);
          setCompanyName(item.data().companyName);
          setAddress(item.data().address);
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={'Profil Düzenleme'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />

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
      {badContact != '' && <Text style={styles.errorMsg}>{badContact}</Text>}
      <CustomTextInput
        value={companyName}
        onChangeText={txt => setCompanyName(txt)}
        title={'Şirket Adı'}
        placeholder={'abc'}
        bad={badCompanyName != '' ? true : false}
      />
      {badCompanyName != '' && (
        <Text style={styles.errorMsg}>{badCompanyName}</Text>
      )}
      <CustomTextInput
        value={address}
        onChangeText={txt => setAddress(txt)}
        title={'Adres'}
        placeholder={'aa'}
        bad={badAddress != '' ? true : false}
      />
      {badAddress != '' && <Text style={styles.errorMsg}>{badAddress}</Text>}

      <CustomSolidBtn
        title={'Güncelle'}
        onClick={() => {
          if (validate()) {
            updatedUser();
          }
        }}
      />

      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default UpdateProfileForCompany;

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
