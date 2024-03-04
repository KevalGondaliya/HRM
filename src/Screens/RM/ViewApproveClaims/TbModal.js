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

const TbModal = ({ isModalVisible, onCloseModal, modalData, onPress }) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'Approve Claims'}
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
              {modalData.user?.user_name || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Claim Type</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.claim_type?.description || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Claim Category</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.claimTypeCategory?.category || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Expenditure Date</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.expediture_date).format('YYYY MMM DD')}
            </Text>
          </View>

          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Status</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.status || '-'}
            </Text>
          </View>

          <View style={styles.modalIconMainView}>
            <TouchableOpacity onPress={onPress} style={styles.editIconView}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};

export default TbModal;
