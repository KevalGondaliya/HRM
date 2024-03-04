import React from 'react';
import { useState } from 'react';
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import Colors from '../../theme';
import Box from '../../component/Box';
import eye from '../../assets/svg/whiteEye.svg';
import AddDeletModal from '../../models/deletEmployeeModal';

import styles from './style';

const TableModal = ({
  isModalVisible,
  onCloseModal,
  modalData,
  onDeleteBtnPress,
  eyeIconPress,
  editBtnPress,
}) => {
  // const isLoading = useSelector(
  //   state => state.loading.effects.employees.delete,
  // );

  const [visible, setVisible] = useState(false);

  const handleDelete = () => {
    setVisible(false);
    onDeleteBtnPress();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        backdropOpacity={0.7}
        backdropColor={Colors.black}
        isVisible={isModalVisible}
        animationType="slideInUp"
        onBackdropPress={onCloseModal}
        transparent={true}>
        <Box
          label={'Employees'}
          isClose
          onCloseBtn={onCloseModal}
          children={
            <View style={{ padding: scale(15) }}>
              <View style={styles.modalView}>
                <Text style={styles.userNameTxt1}>Employee ID :</Text>
                <Text numberOfLines={1} style={styles.userNameTxt1}>
                  {modalData && modalData?.empId || '-'}
                </Text>
              </View>
              <View style={styles.modalView}>
                <Text style={styles.userNameTxt1}>Name :</Text>
                <Text numberOfLines={1} style={styles.userNameTxt1}>
                  {modalData.user_name || '-'}
                </Text>
              </View>
              <View style={styles.modalView}>
                <Text style={styles.userNameTxt1}>Email :</Text>
                <Text numberOfLines={1} style={styles.userNameTxt1}>
                  {modalData && modalData.email || '-'}
                </Text>
              </View>
              <View style={styles.modalView}>
                <Text style={styles.userNameTxt1}>Department :</Text>
                <Text numberOfLines={1} style={styles.userNameTxt1}>
                  {modalData && modalData?.department || '-'}
                </Text>
              </View>
              <View style={styles.modalView}>
                <Text style={styles.userNameTxt1}>Position :</Text>
                <Text numberOfLines={1} style={styles.userNameTxt1}>
                  {modalData && modalData?.position || '-'}
                </Text>
              </View>

              <View style={styles.iconMainView}>
                <TouchableOpacity
                  disabled={modalData?.status ? false : true}
                  onPress={editBtnPress}
                  style={[styles.editIconView, { opacity: !modalData?.status ? 0.5 : 1 }]}>
                  <Icon
                    name={'edit'}
                    type={'materialicons'}
                    color={Colors.white}
                    size={styles.editIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={eyeIconPress}
                  disabled={modalData?.status ? false : true}
                  style={[styles.editIconView, { opacity: !modalData?.status ? 0.5 : 1 }]}>
                  <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setVisible(true);
                  }}
                  style={styles.editIconView}>
                  <Icon
                    name={modalData.status == false ? 'restore' : 'delete'}
                    type={'materialicons'}
                    color={Colors.white}
                    size={styles.editIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      </Modal>
      <AddDeletModal
        visible={visible}
        setVisible={setVisible}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        isRestore={!modalData?.status ? true : false}
      />
    </>
  );
};

export default TableModal;
