import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import RMDrawerNavigationRoutes from './RMDrawerNavigationRoutes';

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator backBehavior={'history'}>
      <Stack.Screen
        name="RMDrawerNavigationRoutes"
        component={RMDrawerNavigationRoutes}
        options={{title: '', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Main;
