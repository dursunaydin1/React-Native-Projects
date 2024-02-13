// Main.js
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomDrawer from './CustomDrawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TEXT_COLOR} from '../../utils/Colors';
import DrawerScreen from './Drawer';

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      screenOptions={{headerTintColor: TEXT_COLOR}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Drawer"
        component={DrawerScreen}
        options={{title: 'İş Arama'}}
      />
    </Drawer.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
