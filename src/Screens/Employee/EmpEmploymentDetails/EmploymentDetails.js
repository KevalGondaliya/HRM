import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import DropDown from '../../../component/DropDown';
import TextInput from '../../../component/TextInput';
import DropDowns from '../../../component/DropDowns';
import {useDispatch, useSelector} from 'react-redux';
import {
  employeementTypeArr,
  empStatusArr,
  workingHourType,
} from '../../../dummyData';
import DateButton from '../../../component/DateButton';

const PersonalDetails = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.session?.token);
  const [isEmpDatePickerVisible, setEmpDatePickerVisibility] = useState(false);

  const onDepartmentChange = item => {
    dispatch.relationValue.getDepartmentPosition({token, id: item.value});
    props.setPositionValue('');
  };

  const handleStartDateConfirm = date => {
    props.setEmpStartDate(date);
    setEmpDatePickerVisibility(true);
  };

  const hideDateStartDatePicker = () => {
    setEmpDatePickerVisibility(false);
  };
  return (
    <Box
      label={'Employment Details'}
      children={
        <View>
          <DropDowns
            label={'Department*'}
            data={props.departmentArr || []}
            placeholder="Select Department..."
            value={props.departmentValue}
            onChange={item => {
              onDepartmentChange(item);
              props.setDepartmentValue(item.value);
            }}
            disable={props.isView ? true : false}
            style={props.isError && props.departmentValue == '' && styles.error}
            isError={props.isError && props.departmentValue == ''}
          />

          <View style={styles.firstNameMainView}>
            <View style={{width: '48.5%'}}>
              <DropDowns
                label={'Position*'}
                data={props.positionArr || []}
                value={props.positionValue}
                disable={props.isView ? true : false}
                onChange={item => {
                  props.setPositionValue(item.value);
                }}
                placeholder="Select Position…"
                style={
                  props.isError && props.positionValue == '' && styles.error
                }
                isError={props.isError && props.positionValue == ''}
              />
            </View>

            <View style={styles.width48}>
              <Text style={styles.userNameTxt}>Employee ID*</Text>

              <View
                style={[
                  styles.userNameTextInput,
                  styles.fTxtView,
                  {
                    borderWidth: props.isError && props.empId == '' ? 2 : 0,
                    borderColor: 'red',
                  },
                ]}>
                <Text style={styles.fTxt}>F</Text>
                <TextInput
                  onChangeText={props.setEmpId}
                  value={props.empId}
                  style={{
                    width: '80%',
                  }}
                  placeholder={'Enter ID'}
                  placeholderTextColor={Colors.lightRed}
                  editable={props.isView || props.isEmployeeId ? false : true}
                  // isError={props.isError && props.empId == ''}
                />
              </View>
            </View>
          </View>

          <Text style={styles.userNameTxt}>Work Email*</Text>

          <TextInput
            onChangeText={props.setWorkEmail}
            value={props.workEmail}
            style={[
              styles.userNameTextInput,
              {
                borderWidth: props.isError && props.workEmail == '' ? 2 : 0,
                borderColor:
                  props.isError && props.workEmail == '' ? 'red' : null,
              },
            ]}
            placeholder={'Enter Work Email…'}
            placeholderTextColor={Colors.lightRed}
            editable={props.isView ? false : true}
            isError={props.isError && props.workEmail == ''}
          />
          {console.log('props.approvalGroupValue', props.approvalGroupValue)}
          <DropDowns
            label={'Approval Group*'}
            placeholder="Select Approval Group..."
            data={props.approvalGroupArr || []}
            value={props.approvalGroupValue}
            onChange={item => {
              props.setApprovalGroupValue(item.value);
            }}
            disable={props.isView ? true : false}
            style={
              props.isError && props.approvalGroupValue == '' && styles.error
            }
            isError={props.isError && props.approvalGroupValue == ''}
          />

          {/* <DropDowns
            label={'Employment Type*'}
            data={employeementTypeArr || []}
            placeholder="Select Employment Type..."
            value={props.empTypeValue}
            onChange={item => {
              props.setEmpTypeValue(item.value);
            }}
            disable={props.isView ? true : false}
            style={props.isError && props.empTypeValue == '' && styles.error}
            isError={props.isError && props.empTypeValue == ''}
          /> */}
          {console.log('empTypeValue', props.empTypeValue)}
          <DropDowns
            label={'Employment Type*'}
            placeholder="Select Employment Type..."
            data={employeementTypeArr || []}
            value={props.empTypeValue}
            onChange={item => {
              props.setEmpTypeValue(item.value);
            }}
            disable={props.isView ? true : false}
            // style={props.isError && props.empTypeValue == '' && styles.error}
            isError={props.isError && props.empTypeValue}
          />
          {console.log('props.empStatusValue', props.empStatusValue)}
          <DropDowns
            label={'Employment Status*'}
            data={empStatusArr || []}
            placeholder="Select Employment Status..."
            value={props.empStatusValue}
            onChange={item => {
              props.setEmpStatusValue(item.value);
            }}
            disable={props.isView ? true : false}
            style={props.isError && props.empStatusValue == '' && styles.error}
            isError={props.isError && props.empStatusValue == ''}
          />

          <DropDowns
            label={'Working Hours Type*'}
            data={workingHourType || []}
            placeholder="Select Working Hour Type..."
            value={props.workingHourValue}
            onChange={item => {
              props.setWorkingHourValue(item.value);
            }}
            disable={props.isView ? true : false}
            style={
              props.isError && props.workingHourValue == '' && styles.error
            }
            isError={props.isError && props.workingHourValue == ''}
          />

          <DateButton
            date={props.empStartDate}
            isError={props.isError}
            onPress={props.handleEmpStrtDate}
            label={'Employment Start Date*'}
          />
          <DateButton
            date={props.empEndDate}
            onPress={props.handleEmpEndDate}
            isError={props.isError}
            label={'Employment End Date*'}
            disable={props.isView ? true : false}
          />

          <DateTimePickerModal
            isVisible={isEmpDatePickerVisible}
            mode="date"
            onConfirm={handleStartDateConfirm}
            onCancel={hideDateStartDatePicker}
          />
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },

  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(45),
  },

  browseBtn: {
    paddingHorizontal: scale(25),
    marginTop: scale(15),
  },

  removeBtn: {
    backgroundColor: Colors.grayishRed,
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    marginLeft: scale(10),
  },
  dropDownStyle: {
    paddingHorizontal: scale(10),
    marginBottom: scale(2),
  },
  browseTxt: {fontSize: scale(11)},
  mobileView: {marginRight: 0, width: '75%'},
  containerStyle: {height: scale(200)},
  callingCodeView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  dobMainView: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(-5),
  },
  dateView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryPickerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  countryPickerView: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(15),
  },
  countryName: {
    fontSize: 14,
    color: Colors.sBlack,
  },
  width28: {width: '28%'},
  width40: {width: '40%'},
  width48: {width: '48%'},
  firstNameMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownStyle: {marginBottom: scale(2)},
  fTxt: {
    width: '20%',
    textAlign: 'right',
    fontSize: scale(12),
    fontWeight: '600',
    color: Colors.blackPearl,
  },
  fTxtView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
export default PersonalDetails;
