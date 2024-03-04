import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, View, TouchableOpacity} from 'react-native';

import Colors from '../../../theme';
import eye from '../../../assets/svg/whiteEye.svg';
import TableModal from '../../../component/TableModal';

import styles from './style';

const TbModal = ({isModalVisible, onCloseModal, modalData}) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'Nominated Appraisals'}
      children={
        <View style={{padding: scale(15)}}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Appraisal ID</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.appraisalID}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Nominator</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.reviewer}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Start Date</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.startDate}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>End Date</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.endDate}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Status</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.status}
            </Text>
          </View>

          <View style={styles.modalIconMainView}>
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
          </View>
        </View>
      }
    />
  );
};

export default TbModal;
