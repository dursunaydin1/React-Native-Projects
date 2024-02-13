import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {BG_COLOR} from '../../utils/Colors';
import {scale, verticalScale} from 'react-native-size-matters';
import Home from './tabs/Home';
import Applies from './tabs/Applies';
import Inbox from './tabs/Inbox';
import Profile from './tabs/Profile';

const DrawerScreen = () => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <View style={styles.container}>
      {currentTab == 0 ? (
        <Home />
      ) : currentTab == 1 ? (
        <Applies />
      ) : currentTab == 2 ? (
        <Inbox />
      ) : (
        <Profile />
      )}
      <View style={styles.bottomNavView}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setCurrentTab(0);
          }}>
          <Image
            source={
              currentTab == 0
                ? require('../../images/home1.png')
                : require('../../images/home.png')
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setCurrentTab(1);
          }}>
          <Image
            source={
              currentTab == 1
                ? require('../../images/send1.png')
                : require('../../images/send.png')
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setCurrentTab(2);
          }}>
          <Image
            source={
              currentTab == 2
                ? require('../../images/chat.png')
                : require('../../images/chat1.png')
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setCurrentTab(3);
          }}>
          <Image
            source={
              currentTab == 3
                ? require('../../images/user.png')
                : require('../../images/user1.png')
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  bottomNavView: {
    width: '100%',
    height: verticalScale(80),
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopWidth: 0.2,
    borderTopColor: '#9e9e9e',
  },
  tab: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: scale(24),
    height: scale(24),
  },
});
