import React from 'react';
import {View, Text} from 'react-native';

import Box from '../../../component/Box';
import RadioButton from '../../../component/RadioButton';

import styles from './style';

const Settings = props => {
  return (
    <Box
      label={'Settings'}
      children={
        <View style={styles.mainView}>
          <Text style={styles.userNameTxt}>
            Allow Manager to create additional leaves?*
          </Text>

          <RadioButton
            value={props.isAdditionalLeave}
            onPress={props.setIsAdditionalLeave}
          />
        </View>
      }
    />
  );
};

export default Settings;
