import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import RMNavigation from './RMNavigation';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';
import EmployeeNavigation from './EmployeeNavigation';
import SplashScreen from 'react-native-splash-screen';

export function NavigatorSwitch() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const isAuthenticated = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);

  return
  //  <MainNavigation />;
  if (!isAuthenticated) return <AuthNavigation />;
  else if (user?.user_type == 'Employee') return <EmployeeNavigation />;
  else if (user?.user_type == 'RM') return <RMNavigation />;
  else return <MainNavigation />;
  return <MainNavigation />
}
