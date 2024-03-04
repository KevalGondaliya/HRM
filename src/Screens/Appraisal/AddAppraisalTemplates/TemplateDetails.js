import React from 'react';
import {View, Text} from 'react-native';
import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import Validator from '../../../utility/validator';
import TextInput from '../../../component/TextInput';

import styles from './style';

const TemplateDetails = props => {
  return (
    <Box
      label={'Template Details'}
      children={
        <View style={{paddingBottom: scale(15)}}>
          <Text style={[styles.userNameTxt, styles.marginTopEmpName]}>
            Appraisal Template Name*
          </Text>

          <TextInput
            value={props.templateName}
            style={[styles.userNameTextInput]}
            onChangeText={props.setTemplateName}
            placeholderTextColor={Colors.lightRed}
            placeholder={'Enter Payslip Template Name…'}
            isError={props.isError && props.templateName == ''}
            editable={props.isView ? false : true}
            validationPlaceHolder={' Appraisal Template Name'}
            isValidationError={
              props.templateName != '' &&
              Validator.validateTextInput(props.templateName) == false
                ? true
                : false
            }
          />

          <Text style={[styles.userNameTxt, styles.marginTopEmpName]}>
            Description*
          </Text>

          <TextInput
            value={props.description}
            style={[styles.userNameTextInput]}
            onChangeText={props.setDescription}
            placeholderTextColor={Colors.lightRed}
            placeholder={'Enter Description…'}
            isError={props.isError && props.description == ''}
            editable={props.isView ? false : true}
            validationPlaceHolder={' Appraisal Description'}
            isValidationError={
              props.description != '' &&
              Validator.validateTextInput(props.description) == false
                ? true
                : false
            }
          />
        </View>
      }
    />
  );
};
export default TemplateDetails;
