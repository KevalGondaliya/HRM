import moment from 'moment';
import React, {useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';

import eye from '../../../assets/svg/whiteEye.svg';
import TableModal from '../../../component/TableModal';
import AddDeletModal from '../../../models/deletModal';
import Colors from '../../../theme';

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
  console.log('modaldatatat', modalData);
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'Leave Transactions'}
      children={
        <View style={{padding: scale(15)}}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Employee ID :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.id || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>leave Description :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.leaveDesc || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Reason :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.reason || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Number of Days : </Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.totalNoOfDays || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Start Date :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.leaveStartDate).format('YYYY MMM DD')}
            </Text>
          </View>

          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>End Date :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.leaveEndDate).format('YYYY MMM DD')}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Status :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.status || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Leave ID :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.userId || '-'}
            </Text>
          </View>
          {/* <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Submitted Date :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.createdAt).format('DD-MM-YYYY')}
            </Text>
          </View> */}

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
