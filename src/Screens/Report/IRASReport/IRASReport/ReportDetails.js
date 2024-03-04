import React from 'react';
import moment from 'moment';
import {View, Text} from 'react-native';
import {scale} from 'react-native-size-matters';

import Box from '../../../../component/Box';
import DropDown from '../../../../component/DropDown';
import YearDropDown from '../../../../component/YearDropDown';

import styles from './style';

const ReportDetails = ({
  year,
  style,
  onPress,
  isError,
  organisationArr,
  openOrganisation,
  organisationValue,
  setOrganisationArr,
  setOpenOrganisation,
  setOrganisationValue,
}) => {
  return (
    <Box
      label={'Report Details'}
      children={
        <View style={{marginTop: scale(5)}}>
          <Text style={styles.userNameTxt}>Year*</Text>

          <YearDropDown
            isError={isError}
            date={year && moment(year).format('YYYY')}
            style={style}
            onPress={onPress}
            placeHolder={'Select Year...'}
          />

          {/* <DropDown
            label={'Organisation*'}
            placeholder="Select Organisation…"
            open={openOrganisation}
            value={organisationValue}
            items={organisationArr}
            setOpen={setOpenOrganisation}
            setValue={setOrganisationValue}
            setItems={setOrganisationArr}
            dropDownDirection={'TOP'}
            isError={isError}
            dropDownStyle={styles.dropDownStyle}
            labelStyle={styles.DropDownLabelStyle}
          /> */}
        </View>
      }
    />
  );
};

export default ReportDetails;
