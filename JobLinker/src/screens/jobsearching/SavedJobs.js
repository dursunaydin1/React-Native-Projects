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
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedJobs = () => {
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getsJobs();
  }, []);

  const getsJobs = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('saved_jobs')
      .where('userId', '==', id)
      .get()
      .then(snapshot => {
        const tempJobs = [];
        snapshot.docs.forEach(item =>
          tempJobs.push({...item.data(), savedId: item.id}),
        );
        setJobs(tempJobs);
      })
      .catch(error => {
        console.error('Error searching jobs: ', error);
      });
  };

  const removeSavedJob = id => {
    firestore()
      .collection('saved_jobs')
      .doc(id)
      .delete()
      .then(() => {
        getsJobs();
      });
  };

  return (
    <View style={styles.container}>
      {jobs.length > 0 ? (
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
                    removeSavedJob(item.savedId);
                  }}>
                  <Image
                    source={require('../../images/saved.png')}
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
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>Kaytılı bir iş yok!</Text>
        </View>
      )}
    </View>
  );
};
export default SavedJobs;

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
  emptyView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 30,
    fontWeight: '500',
  },
});
