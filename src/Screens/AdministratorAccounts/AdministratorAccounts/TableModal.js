import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import eye from '../../../assets/svg/whiteEye.svg';
import AddDeletModal from '../../../models/deletModal';

import styles from './style';

const TableModal = ({
  isModalVisible,
  onCloseModal,
  modalData,
  editBtnPress,
  onDeleteBtnPress,
  isLoading,
}) => {
  const [visible, setVisible] = useState(false);

  const handleDelete = () => {
    setVisible(false);
    onDeleteBtnPress();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      backdropOpacity={0.7}
      backdropColor={Colors.black}
      isVisible={isModalVisible}
      animationType="slideInUp"
      onBackdropPress={onCloseModal}
      transparent={true}>
      <Box
        label={`Administrator Accounts`}
        isClose
        onCloseBtn={onCloseModal}
        children={
          <View style={{ padding: scale(15) }}>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Account ID :</Text>

              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.id || "-"}
              </Text>

            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>User Name :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.user_name || "-"}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>User Email :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.email || "-"}
              </Text>
            </View>


            {/* <View style={styles.modalIconMainView}>
              <TouchableOpacity
                onPress={() => editBtnPress()}
                style={styles.editIconView}>
                <Icon
                  name={'edit'}
                  type={'materialicons'}
                  color={Colors.white}
                  size={styles.editIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editIconView}

                onPress={onDeleteBtnPress}>
                {isLoading ? (
                  <ActivityIndicator color={'#fff'} size={'small'} />
                ) : (
                  <Icon
                    name={'edit'}
                    type={'materialicons'}
                    color={Colors.white}
                    size={styles.editIcon}
                  />
                )}
              </TouchableOpacity>
            </View> */}
          </View>
        }
      />

    </Modal>
  );
};

export default TableModal;
