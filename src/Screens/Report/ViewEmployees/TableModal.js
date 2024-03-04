import React from 'react';
import Modal from 'react-native-modal';
import {Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';
import Box from '../../../component/Box';

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
        label={`Employee's  Report`}
        isClose
        onCloseBtn={onCloseModal}
        children={
          <View style={{padding: scale(15)}}>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Employee ID</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.empId || '-'}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Name</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.user_name || '-'}
              </Text>
            </View>

            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Department</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.department || '-'}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Position</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.position || '-'}
              </Text>
            </View>
          </View>
        }
      />
    </Modal>
  );
};

export default TableModal;
