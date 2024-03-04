import React from 'react';
import Modal from 'react-native-modal';
import { Text, View } from 'react-native';

import Colors from '../../../theme';
import DropDowns from '../../../component/DropDowns';
import SaveCancelBtn from '../../../component/SaveCancelBtn';

import styles from './style';
import { statusData } from '../../../utility/constant';
import { employeementTypeArr } from '../../../dummyData';

const ChangeStatus = ({
  changeStatusValue,
  setChangeStatusValue,
  isStatusModalVisible,
  modalClose,
  saveBtn,
  isStatusError,
  saveLoading,
}) => {
  return (
    <Modal
      backdropOpacity={0.7}
      backdropColor={Colors.black}
      isVisible={isStatusModalVisible}
      animationType="slideInUp"
      onBackdropPress={modalClose}
      transparent={true}>
      <View style={styles.modalMainView}>
        <Text style={styles.modalLabel}>Change Status</Text>
        <DropDowns
          label={'Select Status*'}
          placeholder="Select Status..."
          data={employeementTypeArr}
          value={changeStatusValue}
          onChange={item => {
            setChangeStatusValue(item?.value);
          }}
          style={isStatusError && changeStatusValue == '' && styles.error}
        />

        <SaveCancelBtn
          cancelBtn={modalClose}
          style={styles.saveBtn}
          label={'Change'}
          submitBtn={saveBtn}
          saveLoading={saveLoading}
        />
      </View>
    </Modal>
  );
};

export default ChangeStatus;
