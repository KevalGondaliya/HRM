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
  employeeArr,
  openEmployee,
  departmentArr,
  employeeValue,
  setEmployeeArr,
  openDepartment,
  organisationArr,
  setOpenEmployee,
  departmentValue,
  openOrganisation,
  setEmployeeValue,
  setDepartmentArr,
  organisationValue,
  setOpenDepartment,
  setDepartmentValue,
  setOrganisationArr,
  setOpenOrganisation,
  setOrganisationValue,
  openClaimType,
  claimTypeValue,
  claimTypeArr,
  setOpenClaimType,
  setClaimTypeValue,
  setClaimTypeArr,
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

          <DropDown
            label={'Organisation'}
            placeholder="Select Organisation…"
            open={openOrganisation}
            value={organisationValue}
            items={organisationArr}
            setOpen={setOpenOrganisation}
            setValue={setOrganisationValue}
            setItems={setOrganisationArr}
            isError={isError}
            dropDownStyle={styles.dropDownStyle}
            labelStyle={styles.DropDownLabelStyle}
          />

          <DropDown
            label={'Department'}
            placeholder="Select Department…"
            open={openDepartment}
            value={departmentValue}
            items={departmentArr}
            setOpen={setOpenDepartment}
            setValue={setDepartmentValue}
            setItems={setDepartmentArr}
            isError={isError}
            dropDownStyle={styles.dropDownStyle}
            labelStyle={styles.DropDownLabelStyle}
          />

          <DropDown
            label={'Claim Type'}
            placeholder="Select Claim Type…"
            isError={isError}
            open={openClaimType}
            value={claimTypeValue}
            items={claimTypeArr}
            setOpen={setOpenClaimType}
            setValue={setClaimTypeValue}
            setItems={setClaimTypeArr}
            dropDownStyle={styles.dropDownStyle}
            labelStyle={styles.DropDownLabelStyle}
          />

          <DropDown
            label={'Employees'}
            placeholder="Select Employees…"
            dropDownDirection={'TOP'}
            isError={isError}
            open={openEmployee}
            value={employeeValue}
            items={employeeArr}
            setOpen={setOpenEmployee}
            setValue={setEmployeeValue}
            setItems={setEmployeeArr}
            dropDownStyle={styles.dropDownStyle}
            labelStyle={styles.DropDownLabelStyle}
          />

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
