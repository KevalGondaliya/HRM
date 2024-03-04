import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import EmpLeave from '../Screens/Employee/EmpLeave';
import Dashboard from '../Screens/Employee/Dashboard';
import CheckInOut from '../Screens/Employee/CheckInOut';
import EmpPaySlip from '../Screens/Employee/EmpPaySlip';
import EmpProfile from '../Screens/Employee/EmpProfile';
import EmpCustomSidebarMenu from './EmpCustomSidebarMenu';
import EmpAppraisal from '../Screens/Employee/EmpAppraisal';
import EmpDocuments from '../Screens/Employee/EmpDocuments';
import EmpApplyLeave from '../Screens/Employee/EmpApplyLeave';
import ELearningQuiz from '../Screens/Employee/ELearningQuiz';
import ViewELearning from '../Screens/Employee/ViewELearning';
import EmpApplyClaims from '../Screens/Employee/EmpApplyClaims';
import QuizAns from '../Screens/Employee/ELearningQuiz/QuizAns';
import EmpEntitlements from '../Screens/Employee/EmpEntitlements';
import ViewAttendances from '../Screens/Employee/ViewAttendances';
import EmpViewAllClaims from '../Screens/Employee/EmpViewAllClaims';
import ViewAllDeductions from '../Screens/Employee/ViewAllDeductions';
import ViewAllAllowances from '../Screens/Employee/ViewAllAllowances';
import WatchELearningVideo from '../Screens/Employee/WatchELearningVideo';
import EmpEmploymentDetails from '../Screens/Employee/EmpEmploymentDetails';
import EmpNominatedAppraisal from '../Screens/Employee/EmpNominatedAppraisal';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigatorRoutes = props => {
  return (
    <Drawer.Navigator
      backBehavior={'history'}
      drawerContentOptions={{
        activeTintColor: 'rgba(8,10,37,0.5)',
        color: '#080a25',
        fontSize: 18,
        fontWeight: 'bold',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#080a25',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={props => <EmpCustomSidebarMenu {...props} />}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="EmpPaySlip"
        component={EmpPaySlip}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="EmpAppraisal"
        component={EmpAppraisal}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="EmpNominatedAppraisal"
        component={EmpNominatedAppraisal}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="EmpLeave"
        component={EmpLeave}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="EmpApplyLeave"
        component={EmpApplyLeave}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="EmpViewAllClaims"
        component={EmpViewAllClaims}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="EmpApplyClaims"
        component={EmpApplyClaims}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ViewAttendances"
        component={ViewAttendances}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="CheckInOut"
        component={CheckInOut}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="EmpProfile"
        component={EmpProfile}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="EmpEmploymentDetails"
        component={EmpEmploymentDetails}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="EmpDocuments"
        component={EmpDocuments}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="EmpEntitlements"
        component={EmpEntitlements}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="WatchELearningVideo"
        component={WatchELearningVideo}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ELearningQuiz"
        component={ELearningQuiz}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ViewELearning"
        component={ViewELearning}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="QuizAns"
        component={QuizAns}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewAllDeductions"
        component={ViewAllDeductions}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ViewAllAllowances"
        component={ViewAllAllowances}
        options={{title: '', headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
