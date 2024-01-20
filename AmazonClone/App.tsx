import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductScreen from './src/screens/ProductScreen';

const App = () => {
  const isDartkMode = useColorScheme() === 'dark';

  const backgraundStyle = {
    backgraundColor: isDartkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDartkMode ? 'light-content' : 'dark-content'} />
      {/* <HomeScreen /> */}
      <ProductScreen />
    </SafeAreaView>
  );
};

export default App;
