import {View, Text} from 'react-native';
import React from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import 'react-native-gesture-handler';
const App = () => {
  return (
    <View style={{flex: 1}}>
      <MainNavigator />
    </View>
  );
};

export default App;
