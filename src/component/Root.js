import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import React, {useEffect, useRef} from 'react';
import {NavigatorSwitch} from '../navigators/NavigatorSwitch';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function Root() {
  const alerts = useSelector(state => state.alerts.all);
  const alertsProcessed = useRef(0);

  useEffect(() => {
    if (alerts.length <= alertsProcessed.current) return;
    const [alert] = alerts.slice(-1);
    Toast.show({type: alert.type, text1: alert.title, text2: alert.message});
  }, [alerts, alertsProcessed]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <NavigatorSwitch />
    </SafeAreaProvider>
  );
}
