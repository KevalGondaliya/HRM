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
  setNext,
  setPrve,
  pageCurrent,
  setpageCurrent,
  editIconPress,
  eyeIconPress,
  onDelBtnPree,
  isModalVisible,
  setIsModalVisible,
  handleOnCheckBox,
  delArr,
  count,
}) => {
  const dispatch = useDispatch();

  const [modalData, setDate] = useState('');
  const is400 = isWidth400();
  const is500 = isWidth500();
  const isLess400 = isWidthUnder400();
  const [tbData, setTbData] = useState('');
  const isDelElearning = useSelector(state => state.elearning?.isDelElearning);
  const isEditElearning = useSelector(
    state => state.elearning?.isEditElearning,
  );
  const isLoading = useSelector(
    state => state.loading.effects.elearning.delete,
  );

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

  useEffect(() => {
    setIsModalVisible(false);
    dispatch.elearning.saveDelElearning(false);
    dispatch.elearning.saveEditElearning(false);
  }, [isDelElearning, isEditElearning]);

  const onRightBtnPress = () => {
    setPrve(prve + 5);
    setNext(next + 5);
    setpageCurrent(pageCurrent + 1);
  };

  const onEditBtnPress = () => {
    editIconPress(tbData ? tbData : modalData);
  };
  const delBtnPress = () => {
    onDelBtnPree(tbData ? tbData : modalData);
  };
  const eyeBtnPress = () => {
    eyeIconPress(tbData ? tbData : modalData);
  };

  const ListHeader = () => {
    return (
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.emptyView} />

        <Text style={styles.userNameTxt}>Title</Text>

        <Text style={styles.userNameTxt}>Department</Text>

        {is400 && <Text style={styles.userNameTxt}>Position</Text>}
        {is500 && (
          <>
            <Text style={styles.userNameTxt}>Period</Text>

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

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.elearnModTitle}
        </Text>

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.department?.department}
        </Text>

        {is400 && (
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.position?.position}
          </Text>
        )}
        {is500 && (
          <>
            <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
              {item.period}
            </Text>

            <View style={styles.iconMainView}>
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
                {isLoading && tbData.id == item.id ? (
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
        pageCurrent={pageCurrent}
        data={data?.slice(prve, next)}
        onRightBtnPress={onRightBtnPress}
        onLeftBtnPress={onLeftBtnPress}
        renderItem={renderItem}
        ListHeader={ListHeader}
        dataArr={data}
        next={next}
        style={styles.tbContainerView}
      />

      <TbModal
        modalData={modalData}
        eyeIconPress={eyeBtnPress}
        onDelBtnPree={delBtnPress}
        onCloseModal={onCloseModal}
        isModalVisible={isModalVisible}
        editIconPress={onEditBtnPress}
      />
    </Fragment>
  );
};

export default Table;
