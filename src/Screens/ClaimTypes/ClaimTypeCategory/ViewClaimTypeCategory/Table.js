import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import Colors from '../../../../theme';
import eye from '../../../../assets/svg/eye.svg';
import DataTable from '../../../../component/DataTable';
import {useWindowDimensions} from '../../../../dummyData';

import styles from './style';
import {useSelector} from 'react-redux';

const Table = ({
  prve,
  next,
  data,
  delId,
  setPrve,
  setNext,
  pageCurrent,
  setpageCurrent,
  onDelBtnPree,
  editIconPress,
  eyeIconPress,
}) => {
  const deviceWidth = useWindowDimensions();
  const isCategoryLoading = useSelector(
    state => state.loading.effects.claimTypesCategory,
  );

  const ListHeader = () => {
    return (
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.emptyView} />

        <Text style={styles.userNameTxt}>Category</Text>

        <Text style={styles.userNameTxt} />

        {deviceWidth > 400 && <Text style={styles.userNameTxt} />}
        {deviceWidth > 500 && <View style={styles.iconMainView} />}

        {(deviceWidth < 400 || deviceWidth < 500) && (
          <View style={styles.iconMainView} />
        )}
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
        <View style={styles.emptyView}>
          <View style={styles.checkBoxView} />
        </View>

        <Text
          numberOfLines={1}
          style={[styles.userNameTxt, {color: Colors.sBlack}]}>
          {item.category}
        </Text>

        <View style={styles.userNameTxt} />
        {deviceWidth > 400 && <View style={styles.userNameTxt} />}

        {(deviceWidth < 400 || deviceWidth < 500 || deviceWidth > 500) && (
          <View style={styles.iconMainView}>
            <TouchableOpacity onPress={() => editIconPress(item)}>
              <Icon
                name={'edit'}
                type={'materialicons'}
                color={Colors.blackPearl}
                size={styles.editIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => eyeIconPress(item)}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDelBtnPree(item)}>
              {isCategoryLoading.delete && delId == item.id ? (
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
  );
};

export default Table;
