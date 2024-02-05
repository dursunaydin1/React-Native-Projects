import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import 'react-native-gesture-handler';
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
