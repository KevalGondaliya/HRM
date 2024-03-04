import React, {useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';

import eye from '../../assets/svg/whiteEye.svg';
import TableModal from '../../component/TableModal';
import AddDeletModal from '../../models/deletModal';
import Colors from '../../theme';

import styles from './style';

const TbModal = ({
  isModalVisible,
  onCloseModal,
  modalData,
  editIconPress,
  eyeIconPress,
  onDelBtnPree,
}) => {
  const isLoading = useSelector(
    state => state.loading.effects.approvalGroups.delete,
  );

  const [visible, setVisible] = useState(false);

  const handleDelete = () => {
    setVisible(false);
    onDelBtnPree();
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'Approval Group'}
      children={
        <View style={{padding: scale(15)}}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Approval Group :</Text>
            <Text numberOfLines={2} style={styles.userNameTxt1}>
              {modalData.approvalGroupName}
            </Text>
          </View>
          {/* <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Approver :</Text>
            <Text numberOfLines={2} style={styles.userNameTxt1}>
              {modalData.userId}
            </Text>
          </View> */}
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Employees :</Text>
            <Text numberOfLines={2} style={styles.userNameTxt1}>
              {modalData.user?.firstName + ' ' + modalData.user?.lastName ||
                '-'}
            </Text>
          </View>

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
