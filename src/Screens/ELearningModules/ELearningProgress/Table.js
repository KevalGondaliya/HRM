import React, { Fragment, useState } from 'react';
import { Bar } from 'react-native-progress';
import { SvgXml } from 'react-native-svg';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../../theme';
import eye from '../../../assets/svg/eye.svg';
import DataTable from '../../../component/DataTable';
import { useWindowDimensions } from '../../../dummyData';

import styles from './style';
import TbModal from './TbModal';

const Table = ({
  pageCurrent,
  prve,
  next,
  data,
  setPrve,
  setNext,
  setpageCurrent,
  onPress,
  setIsModalVisible,
  isModalVisible,
}) => {
  const deviceWidth = useWindowDimensions();

  const [modalData, setDate] = useState('');

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

  const onEyeBtnPress = () => {
    onPress(modalData);
  };

  const ListHeader = () => {
    return (
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={[styles.headerDate]}>
          <Text style={styles.userNameTxt}>Employee Name</Text>
        </View>
        <View style={styles.headerDate} />
        {deviceWidth > 400 && (
          <View style={styles.headerDate}>
            <Text style={styles.userNameTxt}>Progress</Text>
          </View>
        )}
        {deviceWidth > 500 && (
          <>
            <View style={styles.headerDate} />

            <View style={styles.emptyView2} />
          </>
        )}

        {(deviceWidth < 400 || deviceWidth < 500) && (
          <View style={styles.emptyView1} />
        )}
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    console.log("item.user_name ", item.user_name);
    return (
      <View
        style={[
          styles.headerStyle,
          styles.tbView,
          {
            backgroundColor: index % 2 == 1 ? Colors.grey : Colors.white,
          },
        ]}>
        <View style={[styles.headerDate, { width: scale(90) }]}>
          <Text
            numberOfLines={1}
            style={[
              styles.userNameTxt,
              { color: Colors.sBlack, textTransform: 'capitalize' },
            ]}>
            {item.user_name || "-"}
          </Text>
        </View>
        <View style={styles.headerDate} />
        {deviceWidth > 400 && (
          <View style={styles.headerDate1}>
            <View style={styles.progressSubView}>
              <Bar
                progress={item.score / 10}
                height={scale(12)}
                borderWidth={0}
                borderRadius={20}
                color={Colors.greenWhite}
                width={scale(142)}
              />
            </View>
            <Text style={styles.progressTxt}>{item.score} %</Text>
          </View>
        )}
        {deviceWidth > 500 && (
          <>
            <View style={styles.headerDate} />

            <TouchableOpacity onPress={onPress(item)} style={styles.emptyView2}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity>
          </>
        )}
        {(deviceWidth < 400 || deviceWidth < 500) && (
          <TouchableOpacity
            onPress={() => onMoreBtnPress(item)}
            style={styles.emptyView1}>
            <Icon
              name={'eye'}
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
    <Fragment>
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
        eyeBtnPress={onEyeBtnPress}
      />
    </Fragment>
  );
};

export default Table;
