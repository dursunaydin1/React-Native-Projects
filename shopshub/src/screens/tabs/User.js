import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';

const User = () => {
  return (
    <View style={styles.container}>
      <Header title={'Profile'} />
      <Image
        source={require('../../images/default_user.png')}
        style={styles.user}
      />
      <Text style={styles.name}>{'Dursun'}</Text>
      <Text style={[styles.name, {fontSize: 16, marginTop: 0}]}>
        {'dursunayydin@gmail.com'}
      </Text>
      <TouchableOpacity style={[styles.tab, {marginTop: 40}]}>
        <Text style={styles.txt}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Text style={styles.txt}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Text style={styles.txt}>Address</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Text style={styles.txt}>Payment Methods</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Text style={styles.txt}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
  },
  name: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  tab: {
    width: '90%',
    height: 50,
    borderBottomWidth: 0.3,
    borderBottomColor: '#DBDBDB',
    alignSelf: 'center',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  txt: {
    color: '#000',
  },
});
