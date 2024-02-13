import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../screens/jobsearching/Main';
import SearchJob from '../screens/jobsearching/SearchJob';
import JobDetails from '../screens/jobsearching/JobDetails';
import SignUpForCompany from '../screens/jobposting/SignUpForCompany';
import LoginForCompany from '../screens/jobposting/LoginForCompany';
import SavedJobs from '../screens/jobsearching/SavedJobs';

const Stack = createNativeStackNavigator();
const JobSearchingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchJob"
        component={SearchJob}
        options={{headerShown: true, title: 'İş Ara'}}
      />
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{headerShown: true, title: 'İş Detayı'}}
      />
      <Stack.Screen
        name="LoginForCompany"
        component={LoginForCompany}
        options={{headerShown: false, title: 'Giriş Yap'}}
      />
      <Stack.Screen
        name="SignUpForCompany"
        component={SignUpForCompany}
        options={{headerShown: false, title: 'Kayıt Ol'}}
      />
      <Stack.Screen
        name="SavedJobs"
        component={SavedJobs}
        options={{headerShown: true, title: 'Kayıtlı İşler'}}
      />
    </Stack.Navigator>
  );
};

export default JobSearchingNavigator;
