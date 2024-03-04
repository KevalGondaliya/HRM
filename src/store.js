import {models} from './models';
import {init} from '@rematch/core';
import loadingPlugin from '@rematch/loading';
import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const middlewares = [];
if (__DEV__) {
}
const reduxConfig = {
  combineReducers: persistCombineReducers.bind(null, {
    key: `@HRSimplify:redux`,
    storage: AsyncStorage,
    whitelist: ['session'],
    version: 1,
    throttle: 2000,
  }),
  middlewares: middlewares,
};
export const store = init({
  models,
  plugins: [loadingPlugin()],
  redux: reduxConfig,
});
