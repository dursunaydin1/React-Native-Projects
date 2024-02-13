import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {BG_COLOR, TEXT_COLOR} from '../../utils/Colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchJob = () => {
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState([]);
  const navigation = useNavigation();
  const [savedJobs, setSavedJobs] = useState([]);
  const isFocused = useIsFocused();

  const searchJob = txt => {
    firestore()
      .collection('jobs')
      .where('JobTitle', '==', txt)
      .get()
      .then(snapshot => {
        const tempJobs = [];
        snapshot.docs.forEach(item =>
          tempJobs.push({...item.data(), id: item.id}),
        );
        setJobs(tempJobs);
      })
      .catch(error => {
        console.error('Error searching jobs: ', error);
      });
  };

  useEffect(() => {
    getSavedJobs();
  }, [isFocused]);
  const saveJob = async data => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('saved_jobs')
      .add({
        ...data,
        userId: id,
      })
      .then(() => {
        getSavedJobs();
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
          let temp = [];
          snapshot.docs.forEach(item => {
            temp.push({...item.data(), savedId: item.id});
          });

          setSavedJobs(temp);
        } else {
          setSavedJobs([]);
        }
      });
  };

  const removeSavedJob = async id => {
    const docId = await getSavedJobId(id);
    firestore()
      .collection('saved_jobs')
      .doc(id)
      .delete()
      .then(() => {
        getSavedJobs();
      });
  };

  const checkSavedJob = id => {
    let temp = savedJobs;
    let isSaved = false;
    temp.map(item => {
      item;
      if (item.id == id) {
        isSaved = true;
      }
    });
    return isSaved;
  };

  const getSavedJobId = async () => {
    const userId = await AsyncStorage.getItem('USER_ID');
    let jobId = '';
    const snapshot = await firestore()
      .collection('saved_jobs')
      .where('userId', '==', userId)
      .get();
    snapshot.docs.forEach(item => {
      if (id == item.data().id) {
        jobId = item.id;
      }
    });
    return jobId;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Image
          source={require('../../images/search.png')}
          style={styles.icon}
        />
        <TextInput
          placeholderTextColor={'#9e9e9e'}
          placeholder="Burada iş ara.."
          style={styles.input}
          value={search}
          onChangeText={txt => setSearch(txt)}
        />
        {search !== '' && (
          <TouchableOpacity
            onPress={() => {
              setSearch('');
              searchJob(search);
            }}>
            <Image
              source={require('../../images/close.png')}
              style={styles.close}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={jobs}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.jobItem}
            onPress={() => {
              navigation.navigate('JobDetails', {data: item});
            }}>
            <View style={styles.topView}>
              <Text style={styles.jobTitle}>{item.jobTitle}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (checkSavedJob(item.id)) {
                    removeSavedJob(item.id);
                  } else {
                    saveJob(item);
                  }
                }}>
                <Image
                  source={
                    checkSavedJob(item.id)
                      ? require('../../images/saved.png')
                      : require('../../images/star.png')
                  }
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.jobTitle}>
              {'İş Kategorisi: ' + item.category}
            </Text>
            <Text style={styles.subTitleTitle}>
              {'Yayınlayan: ' + item.posterName}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  searchBox: {
    width: '90%',
    height: verticalScale(40),
    borderWidth: 0.4,
    marginTop: moderateVerticalScale(20),
    alignSelf: 'center',
    borderRadius: moderateScale(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: scale(18),
    height: scale(18),
    marginLeft: moderateScale(30),
  },
  input: {
    width: '75%',
    height: '100%',
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
    color: TEXT_COLOR,
  },
  close: {
    width: scale(16),
    height: scale(16),
    marginLeft: moderateScale(10),
  },
  jobItem: {
    width: '90%',
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  jobTitle: {
    fontSize: moderateScale(22),
    fontWeight: '600',
    width: '90%',
  },
  subTitle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#2e2e2e',
    marginTop: moderateScale(5),
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default SearchJob;
