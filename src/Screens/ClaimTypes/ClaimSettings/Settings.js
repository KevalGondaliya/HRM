import moment from 'moment';
import { Text } from 'react-native';
import React, { Fragment } from 'react';

import Box from '../../../component/Box';
import YearDropDown from '../../../component/YearDropDown';

import styles from './style';

const Settings = ({ isError, style, year, onPress }) => {
  return (
    <Box
      label={'Settings'}
      children={
        <Fragment>
          <Text style={styles.userNameTxt}>
            Claims to be approved by which date?*
          </Text>
          <YearDropDown
            isError={isError}
            date={year && moment(year).format('YYYY MMM DD')}
            style={style}
            onPress={onPress}
            placeHolder={'Select Option…'}
          />
        </Fragment>
      }
    />
  );
};

export default Settings;
