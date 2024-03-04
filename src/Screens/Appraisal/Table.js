import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import React, {Fragment, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {Text, TouchableOpacity, View} from 'react-native';

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
  isModalVisible,
  setIsModalVisible,
  onDeleteBtnPress,
  eyeIconPress,
  editBtnPress,
  handleOnCheckBox,
  delArr,
  count,
}) => {
  const [modalData, setDate] = useState('');
  const [tbId, setTbId] = useState('');
  const is400 = isWidth400();
  const is500 = isWidth500();
  const isLess400 = isWidthUnder400();

  const onMoreBtnPress = item => {
    setIsModalVisible(true);
    setDate(item);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
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
    editBtnPress(modalData);
  };

  const onDelete = item => {
    onDeleteBtnPress(tbId ? tbId : modalData.id);
  };

  const ListHeader = () => {
    return (
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.emptyView} />

        <Text style={styles.userNameTxt}>Appraisal ID</Text>

        <Text style={styles.userNameTxt}>Template Name</Text>

        {is400 && <Text style={styles.userNameTxt}>Department</Text>}
        {is500 && (
          <>
            <Text style={styles.userNameTxt}>Positions</Text>

            <View style={styles.iconMainView} />
          </>
        )}

        {isLess400 && <View style={styles.emptyView1} />}
      </View>
    );
  };

  const renderItem = ({item, index}) => {
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
          {item.id}
        </Text>

        <Text
          numberOfLines={1}
          style={[styles.userNameTxt, {color: Colors.sBlack}]}>
          {item.appraisalTempName}
        </Text>

        {is400 && (
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.department?.department}
          </Text>
        )}
        {is500 && (
          <>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, {color: Colors.sBlack}]}>
              {item.position?.position}
            </Text>

            <View style={styles.iconMainView}>
              <TouchableOpacity>
                <Icon
                  name={'edit'}
                  type={'materialicons'}
                  color={Colors.blackPearl}
                  size={styles.editIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTbId(item.id);
                  onDelete();
                }}>
                <Icon
                  name={'delete'}
                  type={'materialicons'}
                  color={Colors.blackPearl}
                  size={styles.editIcon}
                />
              </TouchableOpacity>
            </View>
          </>
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

  return (
    <Fragment key={count}>
      <DataTable
        next={next}
        dataArr={data}
        renderItem={renderItem}
        ListHeader={ListHeader}
        pageCurrent={pageCurrent}
        data={data?.slice(prve, next)}
        style={styles.tbContainerView}
        onLeftBtnPress={onLeftBtnPress}
        onRightBtnPress={onRightBtnPress}
      />
      <TbModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
        modalData={modalData}
        onDeleteBtnPress={onDelete}
        eyeIconPress={() => eyeIconPress(modalData)}
        editBtnPress={onEditBtnPress}
      />
    </Fragment>
  );
};

export default Table;
