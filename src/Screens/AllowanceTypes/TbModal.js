import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import Colors from '../../theme';
import eye from '../../assets/svg/whiteEye.svg';
import TableModal from '../../component/TableModal';
import AddDeletModal from '../../models/deletModal';

import styles from './style';
import {padNumber} from '../../utility/validator';

const TbModal = ({
  isModalVisible,
  onCloseModal,
  modalData,
  editBtnPress,
  eyeIconPress,
  onDeleteBtnPress,
}) => {
  const isLoading = useSelector(
    state => state.loading.effects.allowanceTypes.delete,
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
        label={'Allowance Types'}
        children={
          <View style={{padding: scale(15)}}>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Description :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.description}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Position ID:</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {/* {modalData?.allowanceTypeRules[0]?.positionId} */}
                {modalData?.allowanceTypeRules &&
                  modalData?.allowanceTypeRules[0]?.positionId}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Limit Period :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData?.allowanceTypeRules &&
                  modalData?.allowanceTypeRules[0]?.limitPeriod}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Allowance Limit :</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData?.allowanceTypeRules &&
                  padNumber(modalData?.allowanceTypeRules[0]?.limitAmt)}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Department ID:</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {/* {modalData?.allowanceTypeRules[0]?.departmentId} */}
                {modalData?.allowanceTypeRules &&
                  modalData?.allowanceTypeRules[0]?.departmentId}
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
                onPress={() => {
                  setVisible(true);
                }}
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
          </View>
        }
      />
      <AddDeletModal
        visible={visible}
        setVisible={setVisible}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
};

export default TbModal;
