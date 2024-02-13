import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BG_COLOR, TEXT_COLOR} from '../../utils/Colors';
import {moderateScale, scale} from 'react-native-size-matters';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomBorderBtn from '../../components/CustomBorderBtn';
import CustomSolidBtn from '../../components/CustomSolidBtn';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../components/Loader';

const ChangeProfilePicForCompany = () => {
  const navigation = useNavigation();
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const openGalery = async () => {
    const res = await launchImageLibrary({mediaType: 'photo'});
    if (!res.didCancel) {
      setImageData(res);
    }
  };
  const openCamera = async () => {
    const res = await launchCamera({mediaType: 'photo'});
    if (!res.didCancel) {
      setImageData(res);
    }
  };

  const uploadPic = async () => {
    setLoading(true);
    const id = await AsyncStorage.getItem('USER_ID');
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    firestore()
      .collection('job_posters')
      .doc(id)
      .update({
        profileImage: url,
      })
      .then(async () => {
        setLoading(false);
        await AsyncStorage.setItem('PROFILE_IMAGE', url);
        navigation.goBack();
      })

      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require('../../images/close.png')} style={styles.back} />
      </TouchableOpacity>
      {imageData == null ? (
        <Image
          source={require('../../images/account.png')}
          style={styles.profile}
        />
      ) : (
        <Image source={{uri: imageData.assets[0].uri}} style={styles.profile} />
      )}

      <CustomBorderBtn
        title={'Galeriden Bir Resim Seç'}
        onClick={() => {
          openGalery();
        }}
      />
      {imageData != null && (
        <CustomSolidBtn
          title={'Profil Resmini Yükle'}
          onClick={() => {
            uploadPic();
          }}
        />
      )}
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default ChangeProfilePicForCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  back: {
    width: scale(18),
    height: scale(18),
  },
  backBtn: {
    marginLeft: moderateScale(20),
    marginTop: moderateScale(20),
  },
  profile: {
    width: scale(150),
    height: scale(150),
    alignSelf: 'center',
    borderRadius: scale(150),
    marginTop: moderateScale(50),
  },
  pickBtn: {
    padding: moderateScale(10),
    borderWidth: 1,
    width: '60%',
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: moderateScale(10),
    marginTop: moderateScale(50),
    color: TEXT_COLOR,
  },
});
