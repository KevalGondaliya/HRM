import moment from 'moment';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {scale} from 'react-native-size-matters';
import {Text, View} from 'react-native';

import eye from '../../../assets/svg/whiteEye.svg';
import TableModal from '../../../component/TableModal';
import AddDeletModal from '../../../models/deletModal';

import styles from './style';
import {padNumber} from '../../../utility/validator';

const TbModal = ({
  isModalVisible,
  onCloseModal,
  modalData,
  onDeleteBtnPress,
}) => {
  const isLoading = useSelector(
    state => state.loading.effects.allowanceTransactions.delete,
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
      label={'View All Allowances'}
      children={
        <View style={{padding: scale(15)}}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Allowance ID :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.id || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Allowance Date :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData?.allowanceDate
                ? moment(modalData?.allowanceDate).format('YYYY MMM DD')
                : '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Employee ID :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.userId || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Name :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData?.user?.user_name || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Allowance Description :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.allowDesc || '-'}
            </Text>
          </View>

          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Amount :</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData?.amount ? padNumber(modalData.amount) : '-'}
            </Text>
          </View>

          <View style={styles.modalIconMainView}>
            {/* <TouchableOpacity
              onPress={editBtnPress}
              style={styles.editIconView}>
              <Icon
                name={'edit'}
                type={'materialicons'}
                color={Colors.white}
                size={styles.editIcon}
              />
            </TouchableOpacity> */}
            {/* 
            <TouchableOpacity
              onPress={eyeIconPress}
              style={styles.editIconView}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity> */}

            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
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
