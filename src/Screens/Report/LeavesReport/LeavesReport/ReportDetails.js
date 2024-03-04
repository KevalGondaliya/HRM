import moment from 'moment';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import Box from '../../../../component/Box';
import DropDowns from '../../../../component/DropDowns';
import MonthModal from '../../../../component/MonthModal';
import YearDropDown from '../../../../component/YearDropDown';

import styles from './style';
import { isResumable } from 'react-native-fs';

const ReportDetails = ({
  year,
  month,
  style,
  onPress,
  isError,
  setMonth,
  employeeArr,
  departmentArr,
  employeeValue,
  organisationArr,
  departmentValue,
  setEmployeeValue,
  organisationValue,
  setDepartmentValue,
  setOrganisationValue,
  leavesTypeValue,
  leavesTypeArr,
  setLeavesTypeValue,
  setLeaveTypeItem,
  setDepartmentItem,
  setOrganisationItem,
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

  const dispatch = useDispatch();
  const token = useSelector(state => state.session?.token);

  const onOrgChange = item => {
    dispatch.relationValue.getOrgDepartment({ token, id: item.value });
  };

  return (
    <Box
      label={'Report Details'}
      children={
        <View style={{ marginTop: scale(5) }}>
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

          {/* <DropDowns
            label={'Organisation*'}
            data={organisationArr || []}
            placeholder="Select Organisation..."
            value={organisationValue}
            onChange={item => {
              onOrgChange(item);
              setOrganisationValue(item.value);
              setOrganisationItem(item.label);
            }}
            style={isError && organisationValue == '' && styles.error}
          /> */}

          <DropDowns
            label={'Department*'}
            data={departmentArr || []}
            placeholder="Select Department..."
            value={departmentValue}
            onChange={item => {
              setDepartmentValue(item.value);
              setDepartmentItem(item.label);
            }}
            style={isError && departmentValue == '' && styles.error}
            isError={isError && departmentValue == ''}
          />

          <DropDowns
            label={'Leave Type'}
            placeholder="Select Leave Type…"
            data={leavesTypeArr || []}
            value={leavesTypeValue}
            onChange={item => {
              setLeavesTypeValue(item.value);
              setLeaveTypeItem(item.label);
            }}
            style={isError && leavesTypeValue == '' && styles.error}
            isError={isError && leavesTypeValue == ''}
          />

          <DropDowns
            label={'Employees'}
            placeholder="Select Employees…"
            data={employeeArr || []}
            value={employeeValue}
            onChange={item => {
              setEmployeeValue(item.value);
            }}
            style={isError && employeeValue == '' && styles.error}
            isError={isError && employeeValue == ''}
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
