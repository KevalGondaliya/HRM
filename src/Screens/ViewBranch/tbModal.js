import React from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import Colors from '../../theme';
import eye from '../../assets/svg/whiteEye.svg';
import TableModal from '../../component/TableModal';

import styles from './style';

const TbModal = ({
  isModalVisible,
  onCloseModal,
  modalData,
  onEditIconPress,
  onEyeIconPress,
  onDelBtnPree,
}) => {
  const isLoading = useSelector(
    state => state.loading.effects.branch.deleteBranch,
  );
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'Branches'}
      children={
        <View style={{padding: scale(15)}}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Branch Name</Text>
            <Text numberOfLines={2} style={styles.userNameTxt1}>
              {modalData.branch_name}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Checkin Radius</Text>
            <Text numberOfLines={2} style={styles.userNameTxt1}>
              {modalData.checkin_radius}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Country</Text>
            <Text numberOfLines={2} style={styles.userNameTxt1}>
              {modalData.country}
            </Text>
          </View>

          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Postal</Text>
            <Text numberOfLines={2} style={styles.userNameTxt1}>
              {modalData.postal}
            </Text>
          </View>

          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Address</Text>
            <Text numberOfLines={2} style={styles.userNameTxt1}>
              {modalData.add_line1}
            </Text>
          </View>

          <View style={styles.modalIconMainView}>
            <TouchableOpacity
              onPress={() => onEditIconPress(modalData)}
              style={styles.editIconView}>
              <Icon
                name={'edit'}
                type={'materialicons'}
                color={Colors.white}
                size={styles.editIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onEyeIconPress(modalData)}
              style={styles.editIconView}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onDelBtnPree(modalData)}
              style={styles.editIconView}>
              {isLoading ? (
                <ActivityIndicator color={'#fff'} size={'small'} />
              ) : (
                <Icon
                  name={'delete'}
                  type={'materialicons'}
                  color={Colors.white}
                  size={styles.editIcon}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};

export default TbModal;
