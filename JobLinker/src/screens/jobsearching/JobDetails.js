import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BG_COLOR, TEXT_COLOR} from '../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useIsFocused, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const JobDetails = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [savedJobId, setSavedJobId] = useState('');
  const [appliedJobId, setAppliedJobId] = useState('');
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [isJobApplied, setIsJobApplied] = useState(false);

  useEffect(() => {
    getData();
    getSavedJobs();
    getAppliedJobs();
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

  const saveJobs = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('saved_jobs')
      .add({
        ...route.params.data,
        userId: id,
      })
      .then(() => {
        getSavedJobs();
      });
  };

  const applyJobs = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('applied_jobs')
      .add({
        ...route.params.data,
        userId: id,
      })
      .then(() => {
        getAppliedJobs();
      });
  };

  const getSavedJobs = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('saved_jobs')
      .where('userId', '==', id)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          snapshot.docs.forEach(item => {
            if (item.data().id == route.params.data.id) {
              setIsJobSaved(true);
              setSavedJobId(item.id);
            } else {
              setIsJobSaved(false);
              setSavedJobId('');
            }
          });
        }
      });
  };
  const getAppliedJobs = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('applied_jobs')
      .where('userId', '==', id)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          snapshot.docs.forEach(item => {
            if (item.data().id == route.params.data.id) {
              setIsJobApplied(true);
              setAppliedJobId(item.id);
            } else {
              setIsJobApplied(false);
              setAppliedJobId('');
            }
          });
        }
      });
  };

  const removeSavedJob = () => {
    firestore()
      .collection('saved_jobs')
      .doc(savedJobId)
      .delete()
      .then(() => {
        getSavedJobs();
      });
  };
  const cancelApply = () => {
    firestore()
      .collection('applied_jobs')
      .doc(appliedJobId)
      .delete()
      .then(() => {
        getAppliedJobs();
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.data.jobTitle}</Text>
      <View style={styles.details}>
        <Text>{'Yayınlayan: ' + route.params.data.posterName}</Text>
      </View>
      <Text style={styles.desc}>{route.params.data.jobDesc}</Text>
      <Text style={styles.subTitle}>
        {'Deneyim: ' + route.params.data.exp + 'yıl'}
      </Text>
      <Text style={styles.subTitle}>
        {'Beceriler: ' + route.params.data.skill}
      </Text>
      <Text style={styles.subTitle}>
        {'Ücret: ' + route.params.data.salary + 'LPA'}
      </Text>
      <Text style={styles.subTitle}>
        {'Kategori: ' + route.params.data.category}
      </Text>
      <Text style={styles.subTitle}>
        {'Şirket: ' + route.params.data.company}
      </Text>
      <View style={styles.buttomView}>
        <TouchableOpacity
          style={styles.saveBtn}
          disabled={isLogin ? false : true}
          onPress={() => {
            if (isJobSaved) {
              removeSavedJob();
            } else {
              saveJobs();
            }
          }}>
          <Image
            source={
              isJobSaved
                ? require('../../images/saved.png')
                : require('../../images/star.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!isJobApplied) {
              applyJobs();
            } else {
              cancelApply();
            }
          }}
          disabled={isLogin ? false : true}
          style={[
            styles.applyBtn,
            {backgroundColor: isLogin ? 'black' : '#9e9e9e'},
          ]}>
          <Text style={styles.btnText}>
            {isJobApplied ? 'Başvurular' : 'Başvur'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  title: {
    fontSize: moderateScale(30),
    fontWeight: '700',
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  desc: {
    width: '90%',
    marginTop: moderateScale(20),
    fontSize: moderateScale(16),
    fontWeight: '500',
    alignSelf: 'center',
  },
  subTitle: {
    marginTop: moderateScale(20),
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginLeft: moderateScale(20),
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  buttomView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: moderateScale(30),
  },
  saveBtn: {
    width: '25%',
    height: verticalScale(35),
    borderWidth: 0.5,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: scale(24),
    height: scale(24),
  },
  applyBtn: {
    width: '70%',
    height: scale(40),
    backgroundColor: TEXT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  btnText: {
    color: BG_COLOR,
    fontSize: moderateScale(16),
  },
});
