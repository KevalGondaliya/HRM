import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity } from 'react-native';

import Colors from '../../../theme';
import eye from '../../../assets/svg/whiteEye.svg';
import TableModal from '../../../component/TableModal';

import styles from './style';
import moment from 'moment';

const TbModal = ({ isModalVisible, onCloseModal, modalData, eyeBtnPress }) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'Approve Leaves'}
      children={
        <View style={{ padding: scale(15) }}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Submitted Date</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.createdAt).format('YYYY MMM DD')}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Employee Name</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData?.user?.user_name || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Leave Type</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.leaveDesc || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Leave Start Date</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.leaveStartDate).format('YYYY MMM DD')}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Leave End Date</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.leaveEndDate).format('YYYY MMM DD')}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>No. of Days</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.totalNoOfDays || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Status</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.status || '-'}
            </Text>
          </View>

          <View style={styles.modalIconMainView}>
            <TouchableOpacity onPress={eyeBtnPress} style={styles.editIconView}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};

export default TbModal;
