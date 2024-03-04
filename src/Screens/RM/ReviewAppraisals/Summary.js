import React from 'react';
import {View, Text} from 'react-native';

import Box from '../../../component/Box';
import Button from '../../../component/Button';

import styles from './style';

const Summary = props => {
  return (
    <Box
      label={'Summary'}
      children={
        <View style={styles.summaryContainer}>
          <Text style={styles.totalScore}>Total Score : 50 / 50</Text>

          <Button
            label={'Employee Sign Off'}
            btnStyle={styles.browseBtn}
            labelStyle={styles.browseTxt}
          />
        </View>
      }
    />
  );
};

export default Summary;
