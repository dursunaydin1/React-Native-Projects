import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BG_COLOR, TEXT_COLOR} from '../../../utils/Colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const MyJobs = () => {
  const isFocused = useIsFocused();
  const [jobs, setJobs] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false); // Yeni durum: işler yüklendi mi?

  useEffect(() => {
    getJobs();
  }, [isFocused]);

  const getJobs = async () => {
    setLoading(true);
    let id = await AsyncStorage.getItem('USER_ID');
    firestore()
      .collection('jobs')
      .where('postedBy', '==', id)
      .get()
      .then(async data => {
        setLoading(false);
        let temp = [];
        data.docs.forEach(item => {
          temp.push({...item.data(), id: item.id});
        });
        await AsyncStorage.setItem('JOBS', temp.length + '');
        setJobs(temp);
        setLoaded(true); // Yeni durum: işler yüklendi
      });
  };

  const deleteJob = id => {
    firestore()
      .collection('jobs')
      .doc(id)
      .delete()
      .then(() => {
        getJobs();
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>İş Listem</Text>
      {loading && (
        <View>
          <FlatList
            data={[1, 2, 3]}
            renderItem={({item, index}) => {
              return (
                <View style={styles.loaderView}>
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <ShimmerPlaceholder style={styles.loaderTitle} />
                  <View style={styles.loaderBottomView}>
                    <ShimmerPlaceholder style={styles.loaderBtn} />
                    <ShimmerPlaceholder style={styles.loaderBtn} />
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}

      {loaded && jobs.length > 0 ? (
        <FlatList
          data={jobs}
          renderItem={({item, index}) => {
            return (
              <View style={styles.jobItem}>
                <Text style={styles.title}>{item.jobTitle}</Text>
                <Text style={styles.desc}>{item.jobDesc}</Text>
                <Text style={styles.salary}>
                  {'Ücret: ' + item.salary + 'L/yıl'}
                </Text>
                <Text style={styles.salary}>
                  {'Kategori: ' + item.category}
                </Text>
                <Text style={styles.salary}>{'Yetenek: ' + item.skill}</Text>
                <View style={styles.bottomView}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => {
                      navigation.navigate('EditJob', {data: item});
                    }}>
                    <Text>İlanı Düzenle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => {
                      deleteJob(item.id);
                    }}>
                    <Text style={{color: 'red'}}>İlanı Sil</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      ) : loaded && jobs.length === 0 ? (
        <View style={styles.emptyBtn}>
          <Text style={styles.title}>İş Bulunamadı!</Text>
        </View>
      ) : null}
    </View>
  );
};

export default MyJobs;

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
  jobItem: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    backgroundColor: '#f2f2f2',
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
  },
  title: {
    fontSize: moderateScale(20),
    color: TEXT_COLOR,
    fontWeight: '600',
  },
  desc: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginTop: moderateScale(5),
  },
  salary: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    marginTop: moderateScale(5),
  },
  bottomView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: moderateScale(20),
    alignItems: 'center',
    marginTop: moderateScale(15),
  },
  editBtn: {
    width: '40%',
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    width: '40%',
    height: verticalScale(30),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBtn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  loaderTitle: {
    width: '70%',
    height: verticalScale(20),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(10),
  },
  loaderBottomView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: moderateScale(10),
  },
  loaderBtn: {
    width: '46%',
    height: verticalScale(30),
    borderRadius: moderateScale(10),
  },
});
