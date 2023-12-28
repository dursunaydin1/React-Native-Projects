import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import NoteScreen from './screens/NoteScreen';
import Intro from './screens/Intro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NoteDetail from './components/NoteDetail';
import {NavigationContainer} from '@react-navigation/native';
import NoteProvider from './contexts/NoteProvider';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  const findUser = async () => {
    try {
      const result = await AsyncStorage.getItem('user');
      if (result !== null) {
        setUser(JSON.parse(result));
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  const RenderNoteScreen = props => <NoteScreen {...props} user={user} />;

  if (!user) return <Intro onFinish={findUser} />;

  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{headerTitle: '', headerTransparent: true}}>
          <Stack.Screen name="NoteScreen" component={RenderNoteScreen} />
          <Stack.Screen name="NoteDetail" component={NoteDetail} />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
