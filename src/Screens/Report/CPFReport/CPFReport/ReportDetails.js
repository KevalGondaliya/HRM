import moment from 'moment';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {scale} from 'react-native-size-matters';

import Box from '../../../../component/Box';
import DropDown from '../../../../component/DropDown';
import MonthModal from '../../../../component/MonthModal';
import YearDropDown from '../../../../component/YearDropDown';

import styles from './style';

const ReportDetails = ({
  year,
  month,
  style,
  onPress,
  isError,
  setMonth,
  organisationArr,
  openOrganisation,
  organisationValue,
  setOrganisationArr,
  setOpenOrganisation,
  setOrganisationValue,
}) => {
  const [isOpen, toggleOpen] = useState(false);
  const [value, setValue] = useState(null);

  const onChangeMonth = value => {
    setMonth(value);
    setValue(value);
    toggleOpen(false);
  };

  const onYearChange = () => {
    toggleOpen(false);
  };

  const onMonthBtnPress = () => {
    toggleOpen(true);
  };
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

          <Text style={styles.userNameTxt}>Month*</Text>

          <YearDropDown
            isError={isError}
            date={month && moment(month).format('MMMM')}
            style={style}
            onPress={onMonthBtnPress}
            placeHolder={'Select Month...'}
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

          <MonthModal
            onYearChange={onYearChange}
            isOpen={isOpen}
            onChangeMonth={onChangeMonth}
            value={value}
          />
        </View>
      }
    />
  );
};

export default ReportDetails;
