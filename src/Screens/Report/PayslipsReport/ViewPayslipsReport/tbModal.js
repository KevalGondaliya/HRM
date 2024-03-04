import React from 'react';
import { Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';

import TableModal from '../../../../component/TableModal';

import styles from './style';
import { padNumber } from '../../../../utility/validator';

const TbModal = ({ isModalVisible, onCloseModal, modalData }) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'Payslips Report'}
      children={
        <View style={{ padding: scale(15) }}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Payslip ID</Text>
            <Text numberOfLines={2} style={styles.userNameTxt1}>
              {modalData.id}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Name</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.name}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Organisation</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.organisation}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Department</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.department}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Amount</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {padNumber(modalData.amount)}
            </Text>
          </View>
        </View>
      }
    />
  );
};

export default TbModal;
