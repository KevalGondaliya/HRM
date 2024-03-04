import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import React, {Fragment, useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

import TbModal from './TbModal';
import Colors from '../../theme';
import eye from '../../assets/svg/eye.svg';
import DataTable from '../../component/DataTable';
import {isWidth400, isWidth500, isWidthUnder400} from '../../utils';

import styles from './style';

const Table = ({
  prve,
  next,
  data,
  setPrve,
  setNext,
  pageCurrent,
  setpageCurrent,
  onDelBtnPree,
  isDelDeductionLoding,
  editIconPress,
  eyeIconPress,
  isModalVisible,
  setIsModalVisible,
  handleOnCheckBox,
  delArr,
  count,
}) => {
  const dispatch = useDispatch();
  const isDelDeduction = useSelector(
    state => state.deduction?.isDelDeductionType,
  );

  const is400 = isWidth400();
  const is500 = isWidth500();
  const isLess400 = isWidthUnder400();
  const [tbData, setTbData] = useState('');
  const [modalData, setModalData] = useState('');

  useEffect(() => {
    setIsModalVisible(false);
    setTbData('');
    dispatch.deduction.setDeductionType(false);
    dispatch.deduction.setEditElearning(false);
  }, [isDelDeduction]);

  const onMoreBtnPress = item => {
    setIsModalVisible(true);
    setModalData(item);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  const delBtnPress = () => {
    onDelBtnPree(tbData ? tbData : modalData);
  };

  const onEditBtnPress = () => {
    editIconPress(tbData ? tbData : modalData);
  };

  const eyeBtnPress = () => {
    eyeIconPress(tbData ? tbData : modalData);
  };

  const ListHeader = () => {
    return (
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.emptyView} />

        <Text style={styles.userNameTxt}>Description</Text>

        <Text style={styles.userNameTxt}>Allow Installments</Text>

        {is400 && <Text style={styles.userNameTxt}>Require Documents</Text>}
        {is500 && <View style={[styles.iconMainView, styles.iconSubView]} />}

        {isLess400 && <View style={styles.emptyView1} />}
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    console.log('item.allow_instalments', item);
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

        <Text
          numberOfLines={1}
          style={[styles.userNameTxt, {color: Colors.sBlack}]}>
          {item.description}
        </Text>

        <Text
          numberOfLines={1}
          style={[styles.userNameTxt, styles.capLatterTxt]}>
          {item.allow_instalments ? 'Yes' : 'No' || '-'}
        </Text>

        {is400 && (
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, styles.capLatterTxt]}>
            {item.require_doc ? 'Yes' : 'No' || '-'}
          </Text>
        )}
        {is500 && (
          <View style={[styles.iconMainView, styles.iconSubView]}>
            <TouchableOpacity
              onPress={() => {
                onEditBtnPress();
                setTbData(item);
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
                eyeBtnPress();
                setTbData(item);
              }}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                delBtnPress();
                setTbData(item);
              }}>
              {isDelDeductionLoding ? (
                <ActivityIndicator color={Colors.blackPearl} size={'small'} />
              ) : (
                <Icon
                  name={'delete'}
                  type={'materialicons'}
                  color={Colors.blackPearl}
                  size={styles.editIcon}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
        {isLess400 && (
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

  return (
    <Fragment key={count}>
      <DataTable
        pageCurrent={pageCurrent}
        data={data?.slice(prve, next)}
        onRightBtnPress={onRightBtnPress}
        onLeftBtnPress={onLeftBtnPress}
        renderItem={renderItem}
        ListHeader={ListHeader}
        dataArr={data}
        next={next}
        style={styles.tbMainView}
      />

      <TbModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
        modalData={modalData}
        eyeIconPress={eyeBtnPress}
        editIconPress={onEditBtnPress}
        onDelBtnPree={delBtnPress}
        isDelDeductionLoding={isDelDeductionLoding}
      />
    </Fragment>
  );
};

export default Table;
