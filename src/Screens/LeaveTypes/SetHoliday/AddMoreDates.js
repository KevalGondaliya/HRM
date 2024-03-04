import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';

import DateButton from '../../../component/DateButton';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import TextInput from '../../../component/TextInput';
import Colors from '../../../theme';
import Validator from '../../../utility/validator';

import styles from './style';

const AddMoreDates = ({
  setHoliday,
  holiday,
  isError,
  endDate,
  onDatePress,
  isAddModalVisible,
  addModalClose,
  onAddBtnPress,
  saveLoading,
  publicLeaveDataArr,
}) => {
  return (
    <Modal
      backdropOpacity={0.7}
      backdropColor={Colors.black}
      isVisible={isAddModalVisible}
      animationType="slideInUp"
      onBackdropPress={addModalClose}
      onBackButtonPress={() => {}}
      transparent={true}>
      <View style={styles.modalMainView}>
        <Text style={styles.modalLabel}>Add More Dates</Text>

        {/* <DropDowns
          label={'Leave Description*'}
          data={publicLeaveDataArr}
          placeholder="Holiday Description…"
          value={holiday}
          onChange={item => {
            setHoliday(item.value);
          }}
          style={isError && holiday == '' && styles.error}
        /> */}
        <Text style={[styles.userNameTxt, styles.leaveTxt]}>
          Holiday Description*
        </Text>

        <TextInput
          onChangeText={setHoliday}
          value={holiday}
          isError={isError && holiday == ''}
          style={styles.userNameTextInput}
          placeholder={'Holiday Description'}
          placeholderTextColor={Colors.lightRed}
          validationPlaceHolder={'Leave Description'}
          isValidationError={
            holiday != '' && Validator.validateAlphabate(holiday) == false
              ? true
              : false
          }
        />

        <DateButton
          date={endDate}
          isError={isError}
          onPress={onDatePress}
          label={'Date*'}
        />
        <SaveCancelBtn
          cancelBtn={addModalClose}
          style={styles.saveBtn}
          label={'Add'}
          submitBtn={onAddBtnPress}
          saveLoading={saveLoading}
        />
      </View>
    </Modal>
  );
};

export default AddMoreDates;
