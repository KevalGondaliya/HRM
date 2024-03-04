import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';

import DropDowns from '../../component/DropDowns';
import SaveCancelBtn from '../../component/SaveCancelBtn';
import TextInput from '../../component/TextInput';
import Colors from '../../theme';
import Validator from '../../utility/validator';
import styles from './style';

const AddPositionsModal = ({
  isView,
  isError,
  isEdit,
  position,
  setPosition,
  saveLoading,
  cancelBtnPress,
  isModalVisible,
  submitBtnPress,
  departmentValue,
  departmentArr,
  setDepartmentValue,
}) => {
  return (
    <Modal
      backdropOpacity={0.7}
      backdropColor={Colors.black}
      isVisible={isModalVisible}
      animationType="slideInUp"
      onBackdropPress={cancelBtnPress}
      transparent={true}>
      <View style={styles.userNameTextInput1}>
        <View style={styles.modalMainView}>
          <Text style={styles.modalLabelView}>Add Positions</Text>

          {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>{isEdit == 'true' ? 'Add position' : 'Edit position'}</Text>
          </View> */}
          <DropDowns
            label={'Department*'}
            placeholder="Select Department…"
            data={departmentArr || []}
            value={departmentValue}
            onChange={item => {
              setDepartmentValue(item.value);
            }}
            isError={isError && departmentValue == ''}
            disable={isView ? true : false}
            style={isError && departmentValue == '' && styles.error}
          />

          <Text style={[styles.userNameTxt, styles.positionTxt]}>
            Position*
          </Text>

          <TextInput
            onChangeText={setPosition}
            value={position}
            isError={isError && position == ''}
            style={[styles.userNameTextInput, {marginBottom: 0}]}
            placeholder={'Enter Position…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            validationPlaceHolder={'position'}
            isValidationError={
              position != '' && Validator.validateTextInput(position) == false
                ? true
                : false
            }
          />

          <SaveCancelBtn
            cancelBtn={cancelBtnPress}
            submitBtn={isView ? cancelBtnPress : submitBtnPress}
            style={styles.top}
            saveLoading={saveLoading}
            isEdit={isEdit}
            isView={isView}
            label={isEdit ? 'Submit' : 'Update'}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddPositionsModal;
