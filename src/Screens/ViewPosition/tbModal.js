import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import Colors from '../../theme';
import eye from '../../assets/svg/whiteEye.svg';
import TableModal from '../../component/TableModal';
import AddDeletModal from '../../models/deletModal';

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
    state => state.loading.effects.position.deletePosition,
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
      label={'Positions'}
      children={
        <View style={{ padding: scale(15) }}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Positions :</Text>
            <Text numberOfLines={2} style={styles.userNameTxt1}>
              {modalData.position}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>No. of Employees :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              10
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
