import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NoLoginComponents from '../../../components/NoLoginComponents';
import {BG_COLOR} from '../../../utils/Colors';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Profile = () => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getData();
    getProfileData();
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

  const getProfileData = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('users')
      .doc(id)
      .get()
      .then(data => {
        setUserData(data?.data());
      });
  };
  return (
    <View style={styles.container}>
      {!isLogin && (
        <NoLoginComponents
          desc={
            'Birçok işi çekmek için profesyonel profilinizi/portföyünüzü yönetin'
          }
          heading={'Profil/Portföy için Kolay Yönetim'}
        />
      )}
      {isLogin && (
        <View style={styles.mainView}>
          <TouchableOpacity style={{marginLeft: 20, marginTop: 20}}>
            <Image
              source={require('../../../images/account.png')}
              style={styles.pfofile}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{userData ? userData.name : 'DA'}</Text>
          <Text style={styles.email}>{userData ? userData.email : 'DA'}</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text>Profili Düzenle</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  mainView: {
    flex: 1,
  },
  pfofile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 10,
  },
  email: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 5,
  },
  editBtn: {
    width: 200,
    height: 200,
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 20,
  },
});
