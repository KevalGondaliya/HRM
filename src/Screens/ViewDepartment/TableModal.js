import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../theme';
import Box from '../../component/Box';
import AddDeletModal from '../../models/deletModal';
import whiteEye from '../../assets/svg/whiteEye.svg';

import styles from './style';

const TableModal = ({
  isModalVisible,
  onCloseModal,
  modalData,
  editIconPress,
  eyeIconPress,
  onDelBtnPree,
}) => {
  const [visible, setVisible] = useState(false);

  const handleDelete = () => {
    setVisible(false);
    onDelBtnPree();
  };

  const handleCancel = () => {
    setVisible(false);
  };
  console.log("modalData.department-----", modalData);
  return (
    <Modal
      backdropOpacity={0.7}
      backdropColor={Colors.black}
      isVisible={isModalVisible}
      animationType="slideInUp"
      onBackdropPress={onCloseModal}
      transparent={true}>
      <Box
        label={'Department'}
        isClose
        onCloseBtn={onCloseModal}
        children={
          <View style={{ padding: scale(15) }}>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Department:</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.department || " - "}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Department Code :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.departmentCode || " - "}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Positions :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.positionCount} Positions
              </Text>
            </View>
            {/* <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>No. of Employees</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                10
              </Text>
            </View> */}

            <View style={styles.modalIconMainView}>
              <TouchableOpacity
                onPress={editIconPress}
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
                <SvgXml xml={whiteEye} width={scale(22)} height={scale(22)} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}
                style={styles.editIconView}>
                <Icon
                  name={'delete'}
                  type={'materialicons'}
                  color={Colors.white}
                  size={styles.editIcon}
                />
              </TouchableOpacity>
            </View>
            <AddDeletModal
              visible={visible}
              setVisible={setVisible}
              handleCancel={handleCancel}
              handleDelete={handleDelete}
            />
          </View>
        }
      />
    </Modal>
  );
};

export default TableModal;
