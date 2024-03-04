import moment from 'moment';
import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

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
    state => state.loading.effects.addAppraisalCycles.delete,
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
      label={'Appraisal Cycles'}
      children={
        <View style={{padding: scale(15)}}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Cycle ID :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.id || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Cycle Name :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.cycleName || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Flow Type :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.flowType || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Template :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.appraisalTemplate?.appraisalTempName || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Start Date :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.appraisalStartDate).format('YYYY MMM DD') ||
                '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>End Date :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.appraisalEndDate).format('YYYY MMM DD') || '-'}
            </Text>
          </View>

          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Employee End Date :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {moment(modalData.empEndDate).format('YYYY MMM DD') || '-'}
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
