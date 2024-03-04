import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import React, { Fragment, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import eye from '../../../assets/svg/eye.svg';
import DataTable from '../../../component/DataTable';
import { useWindowDimensions } from '../../../dummyData';
import AddDeletModal from '../../../models/deletModal';
import whiteEye from '../../../assets/svg/whiteEye.svg';

import styles from './style';

const Table = ({
  prve,
  next,
  data,
  setPrve,
  setNext,
  pageCurrent,
  setpageCurrent,
  isModalVisible,
  setIsModalVisible,
  eyeIconPress,
  onDeleteBtnPress,
  editIconPress,
  delId,
  handleOnCheckBox,
  delArr,
  count,
}) => {
  const deviceWidth = useWindowDimensions();
  const isLoading = useSelector(
    state => state.loading.effects.payslipTemplates.delete,
  );
  const [tbData, setTbData] = useState('');
  const [modalData, setDate] = useState('');

  const onMoreBtnPress = item => {
    setIsModalVisible(true);
    setDate(item);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };
  const ListHeader = () => {
    return (
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.emptyView} />
        <View
          style={[
            styles.headerDate,
            { width: deviceWidth > 500 ? styles.width250 : styles.width160 },
          ]}>
          <Text style={styles.userNameTxt}>Template Name</Text>
        </View>
        <View
          style={[
            styles.headerBouns,
            {
              width: deviceWidth > 500 ? styles.width200 : styles.width130,
            },
          ]}>
          <Text style={styles.userNameTxt}>Country</Text>
        </View>
        {(deviceWidth < 400 || deviceWidth < 500) && (
          <View style={styles.emptyView1} />
        )}
        {deviceWidth > 500 && <View style={styles.modalIconMainView} />}
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          styles.headerStyle,
          styles.tbView,
          {
            backgroundColor: index % 2 == 1 ? Colors.grey : Colors.white,
          },
        ]}>
        <TouchableOpacity
          onPress={() => handleOnCheckBox(item.id)}
          style={styles.emptyView}>
          <View style={styles.checkBoxView}>
            {delArr?.includes(item.id) && (
              <Icon name={'check'} type={'entypo'} size={scale(13)} />
            )}
          </View>
        </TouchableOpacity>
        <View
          style={[
            styles.headerDate,
            { width: deviceWidth > 500 ? styles.width250 : styles.width160 },
          ]}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, { color: Colors.sBlack }]}>
            {item.payslipTempName}
          </Text>
        </View>
        <View
          style={[
            styles.headerBouns,
            {
              width: deviceWidth > 500 ? styles.width200 : styles.width130,
            },
          ]}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, { color: Colors.sBlack }]}>
            {item.country}
          </Text>
        </View>
        {(deviceWidth < 400 || deviceWidth < 500) && (
          <TouchableOpacity
            onPress={() => onMoreBtnPress(item)}
            style={styles.emptyView1}>
            <Icon
              name={'plus'}
              type={'entypo'}
              size={scale(23)}
              color={Colors.sBlack}
            />
          </TouchableOpacity>
        )}

        {deviceWidth > 500 && (
          <View style={styles.modalIconMainView}>
            <TouchableOpacity
              onPress={() => {
                setTbData(item);
                onEditBtnPress();
              }}>
              <Icon
                name={'edit'}
                type={'materialicons'}
                color={Colors.blackPearl}
                size={styles.editIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setTbData(item);
                eyeBtnPress();
              }}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDelete(item)}>
              {isLoading && item.id == delId ? (
                <ActivityIndicator color={Colors.blackPearl} size={'small'} />
              ) : (
                <Icon
                  name={'delete'}
                  type={'materialicons'}
                  color={Colors.blackPearl}
                  size={scale(20)}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const onLeftBtnPress = () => {
    if (pageCurrent > 1) {
      setPrve(prve - 5);
      setNext(next - 5);
      setpageCurrent(pageCurrent - 1);
    }
  };

  const onRightBtnPress = () => {
    setPrve(prve + 5);
    setNext(next + 5);
    setpageCurrent(pageCurrent + 1);
  };

  const onEditBtnPress = () => {
    editIconPress(tbData ? tbData : modalData);
  };
  const delBtnPress = () => {
    onDeleteBtnPress(tbData ? tbData : modalData.id);
  };
  const eyeBtnPress = () => {
    eyeIconPress(tbData ? tbData : modalData);
  };

  const onDelete = item => {
    delBtnPress();
    setTbData(item.id);
  };

  const [visible, setVisible] = useState(false);

  const handleDelete = () => {
    setVisible(false);
    delBtnPress();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Fragment key={count}>
      <DataTable
        pageCurrent={pageCurrent}
        data={data?.slice(prve, next)}
        onRightBtnPress={() => {
          onRightBtnPress();
        }}
        onLeftBtnPress={() => {
          onLeftBtnPress();
        }}
        renderItem={renderItem}
        ListHeader={ListHeader}
        dataArr={data}
        next={next}
        style={styles.tbContainerView}
      />

      <Modal
        backdropOpacity={0.7}
        backdropColor={Colors.black}
        isVisible={isModalVisible}
        animationType="slideInUp"
        onBackdropPress={onCloseModal}
        transparent={true}>
        <Box
          label={'Payslip Templates'}
          isClose
          onCloseBtn={onCloseModal}
          children={
            <View style={{ padding: scale(15) }}>
              <View style={styles.modalView}>
                <Text style={styles.userNameTxt1}>Emp. Name :</Text>
                <Text numberOfLines={1} style={styles.userNameTxt1}>
                  {modalData?.user?.user_name}
                </Text>
              </View>
              <View style={styles.modalView}>
                <Text style={styles.userNameTxt1}>Emp.Number: :</Text>
                <Text numberOfLines={1} style={styles.userNameTxt1}>
                  {modalData.identity_no}
                </Text>
              </View>

              <View style={styles.modalView}>
                <Text style={styles.userNameTxt1}>Template Name :</Text>
                <Text numberOfLines={1} style={styles.userNameTxt1}>
                  {modalData.payslipTempName}
                </Text>
              </View>
              <View style={styles.modalView}>
                <Text style={styles.userNameTxt1}>Country :</Text>
                <Text numberOfLines={1} style={styles.userNameTxt1}>
                  {modalData.country}
                </Text>
              </View>
              <View style={styles.modalView}>
                <Text style={styles.userNameTxt1}>IC Number :</Text>
                <Text numberOfLines={1} style={styles.userNameTxt1}>
                  {modalData.icNo}
                </Text>
              </View>


              <View style={styles.iconMainView}>
                <TouchableOpacity
                  onPress={onEditBtnPress}
                  style={styles.editIconView}>
                  <Icon
                    name={'edit'}
                    type={'materialicons'}
                    color={Colors.white}
                    size={styles.editIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={eyeBtnPress}
                  style={styles.editIconView}>
                  <SvgXml xml={whiteEye} width={scale(22)} height={scale(22)} />
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
      </Modal>
      <AddDeletModal
        visible={visible}
        setVisible={setVisible}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </Fragment>
  );
};

export default Table;
