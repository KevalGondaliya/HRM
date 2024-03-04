import React from 'react';
import { Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';

import TableModal from '../../../component/TableModal';

import styles from './style';
import moment from 'moment';

const TbModal = ({ isModalVisible, onCloseModal, modalData }) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'Nominated Appraisals'}
      children={
        <View style={{ padding: scale(15) }}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Appraisal ID :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.apprTempID}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Nominator :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.nominee || "-"}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Start Date :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.createdAt).format('YYYY MMM DD')}
            </Text>
          </View>

          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Status :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.status || "-"}
            </Text>
          </View>

          <View style={[styles.modalIconMainView, { justifyContent: 'center' }]}>
            {/* <TouchableOpacity style={styles.editIconView}>
              <Icon
                name={'edit'}
                type={'materialicons'}
                color={Colors.white}
                size={styles.editIcon}
              />
            </TouchableOpacity> */}

            {/* <TouchableOpacity style={styles.editIconView}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity> */}
          </View>
        </View>
      }
    />
  );
};

export default TbModal;
