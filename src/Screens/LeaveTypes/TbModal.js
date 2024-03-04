import React, {useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';

import eye from '../../assets/svg/whiteEye.svg';
import TableModal from '../../component/TableModal';
import Colors from '../../theme';

import AddDeletModal from '../../models/deletModal';
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
    state => state.loading.effects.leaveType.delete,
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
      label={'Leave Types'}
      children={
        <View style={{padding: scale(15)}}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Description :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.leaveDesc}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Entitled To :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.entitled_to}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Gender :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.gender}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Paid Leave :</Text>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt1, {textTransform: 'capitalize'}]}>
              {modalData.paid_leave ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Prorate By :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.prorateBy}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Reason Required :</Text>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt1, {textTransform: 'capitalize'}]}>
              {modalData.reasonRequired ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Proof Required :</Text>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt1, {textTransform: 'capitalize'}]}>
              {modalData.proofRequired ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Rounding By :</Text>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt1, {textTransform: 'capitalize'}]}>
              {modalData.round_by}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Rounding To :</Text>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt1, {textTransform: 'capitalize'}]}>
              {modalData.round_to}
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
              onPress={() => {
                setVisible(true);
              }}
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
