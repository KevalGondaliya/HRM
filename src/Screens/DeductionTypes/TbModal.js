import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import Colors from '../../theme';
import eye from '../../assets/svg/whiteEye.svg';
import TableModal from '../../component/TableModal';
import AddDeletModal from '../../models/deletModal';

import styles from './style';

const TbModal = ({
  isModalVisible,
  onCloseModal,
  modalData,
  onDelBtnPree,
  editIconPress,
  eyeIconPress,
  isDelDeductionLoding,
}) => {
  const [visible, setVisible] = useState(false);

  const handleDelete = () => {
    setVisible(false);
    onDelBtnPree();
  };

  const handleCancel = () => {
    setVisible(false);
  };
  console.log('modalData', modalData);
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'Deduction Types'}
      children={
        <View style={{padding: scale(15)}}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Description:</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.description}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Allow Installments :</Text>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt1, styles.capLatterTxt]}>
              {modalData.allow_instalments ? 'Yes' : 'No' || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Require Documents :</Text>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt1, styles.capLatterTxt]}>
              {modalData.require_doc ? 'Yes' : 'No' || '-'}
            </Text>
          </View>

          <View style={styles.modalIconMainView}>
            <TouchableOpacity
              style={styles.editIconView}
              onPress={editIconPress}>
              <Icon
                name={'edit'}
                type={'materialicons'}
                color={Colors.white}
                size={styles.editIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editIconView}
              onPress={eyeIconPress}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setVisible(true);
              }}
              style={styles.editIconView}>
              {isDelDeductionLoding ? (
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
            isLoading={isDelDeductionLoding}
          />
        </View>
      }
    />
  );
};

export default TbModal;
