import React from 'react';
import Modal from 'react-native-modal';
import {Text, View} from 'react-native';

import Colors from '../../theme';
import Validator from '../../utility/validator';
import TextInput from '../../component/TextInput';
import SaveCancelBtn from '../../component/SaveCancelBtn';

import styles from './style';

const AddDepartmentModal = ({
  isView,
  isEdit,
  isError,
  route,
  saveLoading,
  departmentCode,
  cancelBtnPress,
  submitBtnPress,
  departmentName,
  isModalVisible,
  setDepartmentName,
  setDepartmentCode,
  setIsModalVisible,
}) => {
  return (
    <Modal
      backdropOpacity={0.7}
      backdropColor={Colors.black}
      isVisible={isModalVisible}
      animationType="slideInUp"
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}
      onBackButtonPress={() => {}}
      transparent={true}>
      <View style={styles.userNameTextInput1}>
        <View style={styles.modalMainView}>
          {isEdit ? (
            <Text style={styles.modalLabel}>Edit Departments</Text>
          ) : (
            <Text style={styles.modalLabel}>Add Departments</Text>
          )}
          {/* <Text style={styles.modalLabel}>Add Departments</Text> */}

          <Text style={[styles.userNameTxt, styles.departmentNameTxt]}>
            Department Name*
          </Text>

          <TextInput
            onChangeText={setDepartmentName}
            value={departmentName}
            isError={isError && departmentName == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Department Name…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            validationPlaceHolder={'Department Name'}
            isValidationError={
              departmentName != '' &&
              Validator.validateTextInput(departmentName) == false
                ? true
                : false
            }
          />

          <Text style={[styles.userNameTxt, styles.departmentTxt]}>
            Department Code*
          </Text>

          <TextInput
            onChangeText={setDepartmentCode}
            value={departmentCode}
            isError={isError && departmentCode == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Department Code…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            validationPlaceHolder={'Department Name'}
            isValidationError={
              departmentCode != '' &&
              Validator.validateTextInput(departmentCode) == false
                ? true
                : false
            }
          />

          <SaveCancelBtn
            cancelBtn={cancelBtnPress}
            submitBtn={isView ? cancelBtnPress : submitBtnPress}
            style={styles.saveBtn}
            saveLoading={saveLoading}
            isEdit={isEdit}
            isView={isView}
            label={isEdit ? 'Update' : 'Submit'}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddDepartmentModal;
