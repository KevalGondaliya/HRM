import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { I18nManager, LogBox, StatusBar } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import Toast from 'react-native-toast-message';
import Root from './src/component/Root';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';

I18nManager.allowRTL(true);
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...']);
const persistor = persistStore(store);

export default function App() {
  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
          <Toast ref={ref => Toast.setRef(ref)} />
        </PersistGate>
      </ReduxProvider>
    </NavigationContainer>
  );
}
