import React from 'react';
import { SvgXml } from 'react-native-svg';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity } from 'react-native';

import eye from '../../../assets/svg/whiteEye.svg';
import TableModal from '../../../component/TableModal';

import styles from './style';

const TbModal = ({ isModalVisible, onCloseModal, modalData, onPress }) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'View E-Learning Module'}
      children={
        <View style={{ padding: scale(15) }}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Module Title :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.elearnModTitle || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>End Date :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.period || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Score :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.score || 0} / {modalData.total || 0}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Status :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.status || 'Not Started Yet'}
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
