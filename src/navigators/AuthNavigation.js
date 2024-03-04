import React from 'react';
import Login from '../Screens/Auth/Login';
import ForgetPassword from '../Screens/ForgetPassword';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: '', headerShown: false}}
      />

      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{title: '', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
