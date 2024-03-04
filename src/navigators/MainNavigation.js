import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DrawerNavigationRoutes from './DrawerNavigationRoutes'; 

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator backBehavior={'history'}>
      <Stack.Screen
        name="DrawerNavigationRoutes"
        component={DrawerNavigationRoutes}
        options={{title: '', headerShown: false}}
      />
 
    </Stack.Navigator>
  );
};

export default Main;
