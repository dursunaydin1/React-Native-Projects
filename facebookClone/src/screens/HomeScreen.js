import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SubHeader from '../components/SubHeader';
import Stories from '../components/Stories';
import Post from '../components/Post';
import {Colors} from '../utils/Colors';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.homeContainer}>
      <SubHeader />
      <Stories />
      <Post />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  homeContainer: {backgroundColor: Colors.background},
});

export default HomeScreen;
