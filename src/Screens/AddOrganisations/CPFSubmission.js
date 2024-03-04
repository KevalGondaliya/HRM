import React from 'react';
import {View, Text} from 'react-native';

import Colors from '../../theme';
import Box from '../../component/Box';
import DropDowns from '../../component/DropDowns';
import TextInput from '../../component/TextInput';

import styles from './style';

const CPFSubmission = ({
  acms,
  isView,
  acmsArr,
  isError,
  setAcms,
  cpfNumber,
  setCPFNumber,
  contribution,
  setContribution,
}) => {
  return (
    <Box
      label={'CPF Submission'}
      children={
        <View>
          <Text style={styles.userNameTxt}>CPF Submission Number*</Text>

          <TextInput
            onChangeText={setCPFNumber}
            value={cpfNumber}
            isError={isError && cpfNumber == ''}
            style={styles.userNameTextInput}
            editable={isView}
            placeholder={'Enter CPF Submission Number…'}
            placeholderTextColor={Colors.lightRed}
          />

          <View style={styles.acmsView}>
            <View style={styles.width48}>
              <DropDowns
                label={'ACMS*'}
                placeholder="Select One..."
                data={acmsArr}
                value={acms}
                onChange={item => {
                  setAcms(item.value);
                }}
                style={isError && acms == '' && styles.error}
                disabled={isView == false && true}
              />
            </View>

            <View style={styles.width48}>
              <Text style={styles.userNameTxt}>Contribution %*</Text>

              <TextInput
                onChangeText={setContribution}
                value={contribution}
                isError={isError && contribution == ''}
                style={styles.userNameTextInput}
                placeholder={'Enter %…'}
                editable={isView}
                placeholderTextColor={Colors.lightRed}
                keyboardType={'numeric'}
              />
            </View>
          </View>
        </View>
      }
    />
  );
};

export default CPFSubmission;
