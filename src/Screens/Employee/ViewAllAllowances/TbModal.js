import React from 'react';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import {Text, View, TouchableOpacity} from 'react-native';

import eye from '../../../assets/svg/whiteEye.svg';
import TableModal from '../../../component/TableModal';

import styles from './style';
import moment from 'moment';
import {padNumber} from '../../../utility/validator';

const TbModal = ({isModalVisible, onCloseModal, modalData}) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'View All Allowances'}
      children={
        <View style={{padding: scale(15)}}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Allowance Date :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.allowanceDate).format('YYYY MMM DD')}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Allowance Type :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.allowDesc || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Amount :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {padNumber(modalData?.amount) || '-'}
            </Text>
          </View>
        </View>
      }
    />
  );
};

export default TbModal;
