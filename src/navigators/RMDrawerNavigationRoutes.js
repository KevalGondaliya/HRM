import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ViewLeave from '../Screens/RM/ViewLeave';
import Dashboard from '../Screens/RM/Dashboard';
import EmpPaySlip from '../Screens/RM/EmpPaySlip';
import ApplyLeave from '../Screens/RM/ApplyLeave';
import CheckInOut from '../Screens/RM/CheckInOut';
import ApplyClaims from '../Screens/RM/ApplyClaims';
import ViewAllClaims from '../Screens/RM/ViewAllClaims';
import ViewAppraisal from '../Screens/RM/ViewAppraisal';
import RMCustomSidebarMenu from './RMCustomSidebarMenu';
import ViewAttendances from '../Screens/RM/ViewAttendances';
import ReviewAppraisals from '../Screens/RM/ReviewAppraisals';
import ViewApproveLeaves from '../Screens/RM/ViewApproveLeaves';
import ViewApproveClaims from '../Screens/RM/ViewApproveClaims';
import NominatedAppraisal from '../Screens/RM/NominatedAppraisal';
import ViewReviewAppraisal from '../Screens/RM/ViewReviewAppraisal';
import CreateAdditionalLeaves from '../Screens/RM/CreateAdditionalLeaves';
import ApproveIndividualLeave from '../Screens/RM/ApproveIndividualLeave';
import ApproveIndividualClaims from '../Screens/RM/ApproveIndividualClaims';
import NominateforPeerAppraisal from '../Screens/RM/NominateforPeerAppraisal';

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
      drawerContent={props => <RMCustomSidebarMenu {...props} />}>
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
        name="ViewAppraisal"
        component={ViewAppraisal}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="NominateforPeerAppraisal"
        component={NominateforPeerAppraisal}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ViewLeave"
        component={ViewLeave}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ApplyLeave"
        component={ApplyLeave}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ViewApproveLeaves"
        component={ViewApproveLeaves}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ApproveIndividualLeave"
        component={ApproveIndividualLeave}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="CreateAdditionalLeaves"
        component={CreateAdditionalLeaves}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ApplyClaims"
        component={ApplyClaims}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ViewAllClaims"
        component={ViewAllClaims}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ViewApproveClaims"
        component={ViewApproveClaims}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ApproveIndividualClaims"
        component={ApproveIndividualClaims}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="CheckInOut"
        component={CheckInOut}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ViewAttendances"
        component={ViewAttendances}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ViewReviewAppraisal"
        component={ViewReviewAppraisal}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="NominatedAppraisal"
        component={NominatedAppraisal}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="ReviewAppraisals"
        component={ReviewAppraisals}
        options={{title: '', headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
