import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

import TbModal from './tbModal';
import Colors from '../../theme';
import eye from '../../assets/svg/eye.svg';
import DataTable from '../../component/DataTable';
import {useWindowDimensions} from '../../dummyData';

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
  const [tbData, setTbData] = useState('');
  const [modalData, setDate] = useState('');

  const isLoading = useSelector(
    state => state.loading.effects.approvalGroups.delete,
  );
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
    editIconPress(modalData);
  };
  const delBtnPress = () => {
    onDeleteBtnPress(tbData ? tbData : modalData.id);
  };
  const eyeBtnPress = () => {
    eyeIconPress(modalData);
  };

  const onMoreBtnPress = item => {
    setIsModalVisible(true);
    setDate(item);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  const onDelete = item => {
    delBtnPress();
    setTbData(item.id);
  };

  const ListHeader = () => {
    return (
      <View style={[styles.headerMainView, styles.headerStyle]}>
        <View style={styles.emptyView} />
        <View style={[styles.headerDate, {width: scale(70)}]}>
          <Text style={styles.userNameTxt}>Approval Group</Text>
        </View>
        <View style={styles.headerDate}>
          <Text style={styles.userNameTxt}>Employees</Text>
        </View>
        {(deviceWidth < 400 || deviceWidth < 500) && (
          <View style={styles.emptyView1} />
        )}
        {deviceWidth > 500 && (
          <View style={styles.headerBouns}>
            <Text style={styles.userNameTxt}>Approver</Text>
          </View>
        )}
        {deviceWidth > 600 && <View style={styles.headerIcon} />}
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    console.log('item*--*---*', item);
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
        <View style={[styles.headerDate, {width: scale(70)}]}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.approvalGroupName || '-'}
          </Text>
        </View>
        <View style={styles.headerDate}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.user?.user_name || '-'}
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
          <View style={styles.headerBouns}>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, {color: Colors.sBlack}]}>
              {item.user?.user_name || '-'}
            </Text>
          </View>
        )}
        {deviceWidth > 600 && (
          <View style={styles.headerIcon}>
            <View style={styles.iconMainView}>
              <TouchableOpacity>
                <Icon
                  name={'edit'}
                  type={'materialicons'}
                  color={Colors.blackPearl}
                  size={scale(20)}
                />
              </TouchableOpacity>

              <TouchableOpacity>
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
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      <DataTable
        pageCurrent={pageCurrent}
        data={data?.slice(prve, next)}
        onRightBtnPress={onRightBtnPress}
        onLeftBtnPress={onLeftBtnPress}
        renderItem={renderItem}
        ListHeader={ListHeader}
        dataArr={data}
        next={next}
      />

      <TbModal
        isModalVisible={isModalVisible}
        modalData={modalData}
        onCloseModal={onCloseModal}
        editIconPress={onEditBtnPress}
        eyeIconPress={eyeBtnPress}
        onDelBtnPree={delBtnPress}
        delId={delId}
      />
    </View>
  );
};

export default Table;
