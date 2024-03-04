import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity } from 'react-native';

import Colors from '../../theme';
import eye from '../../assets/svg/whiteEye.svg';
import TableModal from '../../component/TableModal';

import styles from './style';

const TbModal = ({
  isModalVisible,
  onCloseModal,
  modalData,
  eyeIconPress,
  editBtnPress,
}) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'Assign Employees'}
      children={
        <View style={{ padding: scale(15) }}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Employee ID :</Text>
            <Text numberOfLines={2} style={styles.userNameTxt1}>
              {modalData && modalData?.empId}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Name :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.user_name}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Organisation :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData && modalData?.org_name}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Department :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData && modalData.department}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Position :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData && modalData.position}
            </Text>
          </View>

          <View style={styles.modalIconMainView}>
            <TouchableOpacity
              onPress={editBtnPress}
              style={styles.editIconView}>
              <Icon
                name={'edit'}
                type={'materialicons'}
                color={Colors.white}
                size={styles.editIcon}
              />
            </TouchableOpacity>

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

export default TbModal;
