import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import Colors from '../../../theme';
import eye from '../../../assets/svg/whiteEye.svg';
import { padNumber } from '../../../utility/validator';
import TableModal from '../../../component/TableModal';
import AddDeletModal from '../../../models/deletModal';

import styles from './style';

const TbModal = ({
  isModalVisible,
  onCloseModal,
  modalData,
  onDeleteBtnPress,
  eyeIconPress,
  editBtnPress,
}) => {
  const isLoading = useSelector(
    state => state.loading.effects.applyClaims.delete,
  );

  const [visible, setVisible] = useState(false);

  const handleDelete = () => {
    setVisible(false);
    onDeleteBtnPress();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'View All Claims'}
      children={
        <View style={{ padding: scale(15) }}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Submitted Date :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.createdAt).format('YYYY MMM DD')}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Claim Type :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData?.claim_type?.description || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Claim Category :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData?.claimTypeCategoryId || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Amount :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {padNumber(modalData?.expenditureAmt)}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Expenditure Date :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.expediture_date).format('YYYY MMM DD')}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Status :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.status || '-'}
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

            <TouchableOpacity
              style={styles.editIconView}
              onPress={() => {
                setVisible(true);
              }}>
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
          <AddDeletModal
            visible={visible}
            setVisible={setVisible}
            handleCancel={handleCancel}
            handleDelete={handleDelete}
            isLoading={isLoading}
          />
        </View>
      }
    />
  );
};

export default TbModal;
