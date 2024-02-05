import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    firestore()
      .collection('User')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          console.log(userData);
          gotonext(); // login işlemi başarılı olduğunda 'Main' ekranına git
        } else {
          console.log('Kullanıcı bulunamadı.');
        }
      })
      .catch(error => {
        console.error('Firestore Error:', error.message);
      });
  };

  const gotonext = async () => {
    await AsyncStorage.setItem('IS_USER_LOGGED_IN', 'yes');
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Login'}</Text>
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />

      <TextInput
        placeholder="Enter Password"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />

      <CustomButton
        bg={'red'}
        title={'Login'}
        color={'#fff'}
        onClick={() => {
          loginUser();
        }}
      />
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('Signup')}>
        {'Signup'}
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 40,
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  loginText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
