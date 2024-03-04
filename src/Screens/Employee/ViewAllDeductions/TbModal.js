import React from 'react';
import moment from 'moment';
import { SvgXml } from 'react-native-svg';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity } from 'react-native';

import eye from '../../../assets/svg/whiteEye.svg';
import TableModal from '../../../component/TableModal';

import styles from './style';
import { padNumber } from '../../../utility/validator';

const TbModal = ({ isModalVisible, onCloseModal, modalData }) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'View All Deductions'}
      children={
        <View style={{ padding: scale(15) }}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Deduction Date</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.submit_date).format('YYYY MMM DD')}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Description</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.comments || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Amount</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {padNumber(modalData.amount) || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Comments</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.comments || '-'}
            </Text>
          </View>
        </View>
      }
    />
  );
};

export default TbModal;
