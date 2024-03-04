import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EmpDrawerNavigationRoutes from './EmpDrawerNavigationRoutes';

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator backBehavior={'history'}>
      <Stack.Screen
        name="EmpDrawerNavigationRoutes"
        component={EmpDrawerNavigationRoutes}
        options={{title: '', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Main;
