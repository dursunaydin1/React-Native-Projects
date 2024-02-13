import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {BG_COLOR} from '../../utils/Colors';
import {scale, verticalScale} from 'react-native-size-matters';
import MyJobs from './tabs/MyJobs';
import SearchCandidates from './tabs/SearchCandidates';
import Chats from './tabs/Chats';
import Profile1 from './tabs/Profile1';
import {useNavigation} from '@react-navigation/native';

const DashboardForCompany = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {selectedTab === 0 && <MyJobs />}
      {selectedTab === 1 && <SearchCandidates />}
      {selectedTab === 2 && <Chats />}
      {selectedTab === 3 && (
        <Profile1
          onJobsClick={() => {
            setSelectedTab(0);
          }}
        />
      )}

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={[
            styles.bottomTab,
            {borderTopWidth: selectedTab == 0 ? 3 : 0, borderTopColor: 'red'},
          ]}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../../images/home1.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 0 ? 'red' : 'gray'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomTab,
            {borderTopWidth: selectedTab == 1 ? 3 : 0, borderTopColor: 'red'},
          ]}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('../../images/search-user.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 1 ? 'red' : 'gray'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            // setSelectedTab(2);
            navigation.navigate('AddJob');
          }}>
          <Image
            source={require('../../images/addition.png')}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomTab,
            {borderTopWidth: selectedTab == 2 ? 3 : 0, borderTopColor: 'red'},
          ]}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={require('../../images/chat.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 2 ? 'red' : '#9e9e9e'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomTab,
            {borderTopWidth: selectedTab == 3 ? 3 : 0, borderTopColor: 'red'},
          ]}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={require('../../images/user.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 3 ? 'red' : '#9e9e9e'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashboardForCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  bottomView: {
    width: '100%',
    height: verticalScale(70),
    backgroundColor: '#F9F9F9',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOpacity: 0.5,
    shadowOffset: {x: 0, y: 1},
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC', // Çizgi rengi
  },

  bottomTab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: scale(24),
    height: scale(24),
  },
});
