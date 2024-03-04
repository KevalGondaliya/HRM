import React from 'react';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, TouchableOpacity, View} from 'react-native';

import Colors from '../../theme';
import Box from '../../component/Box';

import styles from './style';

const TableModal = ({isModalVisible, onCloseModal, modalData}) => {
  return (
    <Modal
      backdropOpacity={0.7}
      backdropColor={Colors.black}
      isVisible={isModalVisible}
      animationType="slideInUp"
      onBackdropPress={onCloseModal}
      transparent={true}>
      <Box
        label={'Stanwin’s Payslip'}
        isClose
        onCloseBtn={onCloseModal}
        children={
          <View style={{padding: scale(15)}}>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Item Name</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.itemName}
              </Text>
            </View>
            <View style={[styles.modalView, {marginTop: scale(15)}]}>
              <Text style={styles.userNameTxt1}>Amount</Text>
              <View style={styles.amountView} />
            </View>

            <TouchableOpacity style={styles.editIconView}>
              <Icon
                name={'close'}
                type={'AntDesign'}
                color={Colors.white}
                size={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
        }
      />
    </Modal>
  );
};

export default TableModal;
