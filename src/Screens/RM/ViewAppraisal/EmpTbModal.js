import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import eye from '../../../assets/svg/whiteEye.svg';
import TableModal from '../../../component/TableModal';

import styles from './style';
import { Icon } from 'react-native-elements';
import Colors from '../../../theme';

const EmpTbModal = ({
  isModalVisible,
  onCloseModal,
  eyeIconPress,
  modalData,
  onDeleteBtnPress,
  editBtnPress,
}) => {
  const isLoading = useSelector(
    state => state.loading.effects.appraisal.delete,
  );
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'PEER APPRAISALS'}
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
            <Text style={styles.userNameTxt1}>Start Date</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData?.startDate).format('YYYY MMM DD')}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>End Date</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData?.endDate).format('YYYY MMM DD')}
            </Text>
          </View>

          <View style={[styles.modalIconMainView]}>
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

            <TouchableOpacity
              style={styles.editIconView}
              onPress={onDeleteBtnPress}>
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

export default EmpTbModal;
