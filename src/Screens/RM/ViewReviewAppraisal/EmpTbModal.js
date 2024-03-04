import React from 'react';
import { SvgXml } from 'react-native-svg';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity } from 'react-native';

import eye from '../../../assets/svg/whiteEye.svg';
import TableModal from '../../../component/TableModal';

import styles from './style';
import moment from 'moment';

const EmpTbModal = ({
  isModalVisible,
  onCloseModal,
  eyeIconPress,
  modalData,
}) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'NOMINATED PEER APPRAISALS'}
      children={
        <View style={{ padding: scale(15) }}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Appraisal ID</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.id}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Employee</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.user?.user_name}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Nominee</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.nominee}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Start Date</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData?.createdAt).format('YYYY MMM DD')}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Status</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.status}
            </Text>
          </View>

          <View style={[styles.modalIconMainView, { justifyContent: 'center' }]}>
            <TouchableOpacity
              onPress={eyeIconPress}
              style={styles.editIconView}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};

export default EmpTbModal;
