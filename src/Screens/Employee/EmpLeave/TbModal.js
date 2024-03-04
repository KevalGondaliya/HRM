import moment from 'moment';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import Colors from '../../../theme';
import eye from '../../../assets/svg/whiteEye.svg';
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
    state => state.loading.effects.leaveTransactions.delete,
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
    <>
      <TableModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
        label={'View All Leave'}
        children={
          <View style={{ padding: scale(15) }}>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Submitted Date :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {moment(modalData.createdAt).format('YYYY MMM DD')}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Leave Type :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.leaveDesc}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Leave Start Date :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {moment(modalData.leaveStartDate).format('YYYY MMM DD')}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Leave End Date :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {moment(modalData.leaveEndDate).format('YYYY MMM DD')}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Reason :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.reason}
              </Text>
            </View>
            {/* <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Status :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.status}
              </Text>
            </View> */}

            <View style={styles.modalIconMainView}>
              {console.log(modalData.status)}
              {modalData.status == 'Approve' ? null : (
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
              )}

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
          </View>
        }
      />
      <AddDeletModal
        visible={visible}
        setVisible={setVisible}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default TbModal;
