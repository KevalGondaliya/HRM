import moment from 'moment';
import React, {useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

import Box from '../../../component/Box';
import AddDeletModal from '../../../models/deletModal';
import Colors from '../../../theme';

import styles from './style';

const TableModal = ({
  isModalVisible,
  onCloseModal,
  modalData,
  onDeleteBtnPress,
}) => {
  const isLoading = useSelector(
    state => state.loading.effects.calendarGroup.delete,
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
      <Modal
        backdropOpacity={0.7}
        backdropColor={Colors.black}
        isVisible={isModalVisible}
        animationType="slideInUp"
        onBackdropPress={onCloseModal}
        transparent={true}>
        <Box
          label={'Set Holiday/Block Leaves'}
          isClose
          onCloseBtn={onCloseModal}
          children={
            <View style={{padding: scale(15)}}>
              <View style={styles.modalView}>
                <Text style={styles.userNameTxt1}>Description :</Text>
                <Text numberOfLines={1} style={styles.userNameTxt2}>
                  {modalData.holidayDesc || '-'}
                </Text>
              </View>
              <View style={[styles.modalView, {marginTop: scale(15)}]}>
                <Text style={styles.userNameTxt1}>Date :</Text>
                <Text numberOfLines={1} style={styles.userNameTxt2}>
                  {moment(modalData.date).format('YYYY MMM DD')}
                </Text>
              </View>

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
                    type={'AntDesign'}
                    color={Colors.white}
                    size={styles.editIcon}
                  />
                )}
              </TouchableOpacity>
            </View>
          }
        />
      </Modal>
      <AddDeletModal
        visible={visible}
        setVisible={setVisible}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default TableModal;
