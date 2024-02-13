import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BG_COLOR, TEXT_COLOR} from '../../../utils/Colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileOptionItem from '../../../components/ProfileOptionItem';

const Profile1 = ({onJobsClick}) => {
  const [name, setName] = useState('');
  const [jobs, setJobs] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setName(await AsyncStorage.getItem('NAME'));
    setJobs(await AsyncStorage.getItem('JOBS'));
    let img = await AsyncStorage.getItem('PROFILE_IMAGE');
    if (img != null) {
      setProfileImg(img);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>İş Listem</Text>
      <TouchableOpacity>
        {profileImg != '' ? (
          <Image source={{uri: profileImg}} style={styles.profileImg} />
        ) : (
          <Image
            source={require('../../../images/account.png')}
            style={styles.profileImg}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text
        style={styles.changeProfilePic}
        onPress={() => {
          navigation.navigate('UpdateProfileForCompany');
        }}>
        Profili Güncelle
      </Text>
      <Text
        style={styles.changeProfilePic}
        onPress={() => {
          navigation.navigate('ChangeProfilePicForCompany');
        }}>
        Profil Resmini Değiştir
      </Text>
      <View style={styles.optionArea}>
        <ProfileOptionItem
          icon={require('../../../images/suitcase.png')}
          title={'İş Listem (' + jobs + ')'}
          onClick={() => {
            onJobsClick();
          }}
        />
        <ProfileOptionItem
          icon={require('../../../images/contact-mail.png')}
          title={'Bize Ulaşın'}
          onClick={() => {}}
        />
        <ProfileOptionItem
          icon={require('../../../images/theme.png')}
          title={'Uygulama Teması'}
          onClick={() => {}}
        />
        <ProfileOptionItem
          icon={require('../../../images/turn-off.png')}
          title={'Oturumu Kapat'}
          onClick={() => {}}
        />
      </View>
    </View>
  );
};

export default Profile1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  heading: {
    fontSize: moderateScale(25),
    marginLeft: moderateScale(10),
    fontWeight: '600',
    color: TEXT_COLOR,
  },
  profileImg: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  changeProfilePic: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: moderateScale(10),
    color: TEXT_COLOR,
    fontSize: moderateScale(16),
  },
  name: {
    fontSize: moderateScale(25),
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  optionArea: {
    marginTop: moderateVerticalScale(70),
  },
});
