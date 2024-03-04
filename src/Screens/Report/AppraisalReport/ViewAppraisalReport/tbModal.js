import React from 'react';
import {Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import TableModal from '../../../../component/TableModal';

import styles from './style';

const TbModal = ({isModalVisible, onCloseModal, modalData}) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'Appraisal Report'}
      children={
        <View style={{padding: scale(15)}}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Appraisal ID</Text>
            <Text numberOfLines={2} style={styles.userNameTxt1}>
              {modalData.id}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Name</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.user_name}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Organisation</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.org_name}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Department</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.department}
            </Text>
          </View>
        </View>
      }
    />
  );
};

export default TbModal;
