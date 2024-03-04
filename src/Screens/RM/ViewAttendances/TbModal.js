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

const TbModal = ({ isModalVisible, onCloseModal, modalData }) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'View Attendances'}
      children={
        <View style={{ padding: scale(15) }}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Check In Date</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.check_in).format('YYYY MMM DD')}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Check In Time</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.check_in).format('HH:MM')}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Check In Location</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.check_in_location}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Check Out Date</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.check_out
                ? moment(modalData.check_out).format('YYYY MMM DD')
                : '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Check Out Time</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.check_out
                ? moment(modalData.check_out).format('HH:MM')
                : '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Check Out Location</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.check_out_location}
            </Text>
          </View>

          {/* <View style={styles.modalIconMainView}>
            <TouchableOpacity style={styles.editIconView}>
              <Icon
                name={'edit'}
                type={'materialicons'}
                color={Colors.white}
                size={styles.editIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.editIconView}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.editIconView}>
              <Icon
                name={'delete'}
                type={'materialicons'}
                color={Colors.white}
                size={styles.editIcon}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      }
    />
  );
};

export default TbModal;
