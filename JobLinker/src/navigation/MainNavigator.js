import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import JobPostingNavigator from './JobPostingNavigator';
import JobSearchingNavigator from './JobSearchingNavigator';
import SelectUser from '../screens/onboarding/SelectUser';
import Splash from '../screens/onboarding/Splash';
import DashboardForCompany from '../screens/jobposting/DashboardForCompany';
import AddJob from '../screens/jobposting/tabs/AddJob';
import EditJob from '../screens/jobposting/tabs/EditJob';
import UpdateProfileForCompany from '../screens/jobposting/UpdateProfileForCompany';
import ChangeProfilePicForCompany from '../screens/jobposting/ChangeProfilePicForCompany';

const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DashboardForCompany"
          component={DashboardForCompany}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectUser"
          component={SelectUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobPostingNavigator"
          component={JobPostingNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddJob"
          component={AddJob}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditJob"
          component={EditJob}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangeProfilePicForCompany"
          component={ChangeProfilePicForCompany}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateProfileForCompany"
          component={UpdateProfileForCompany}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobSearchingNavigator"
          component={JobSearchingNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
