import { Bar } from 'react-native-progress';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import React, { Fragment, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import TbModal from './TbModal';
import Colors from '../../../theme';
import DataTable from '../../../component/DataTable';
import { isWidth400, isWidth500, isWidthUnder400 } from '../../../utils';

import styles from './style';

const Table = ({
  pageCurrent,
  prve,
  next,
  data,
  setPrve,
  setNext,
  setpageCurrent,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setDate] = useState('');
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

  const ListHeader = () => {

    return (
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.emptyView} />

        <Text style={styles.userNameTxt}>E-Learning ID</Text>

        <Text style={styles.userNameTxt}>Module Title</Text>

        {is400 && (
          <Text style={[styles.headerDate1, { color: Colors.white }]}>
            Progress
          </Text>
        )}
        {is500 && (
          <>
            <Text style={[styles.userNameTxt, styles.left]}>Score</Text>

            <View style={styles.emptyView1} />
          </>
        )}

        {isLess400 && <View style={styles.emptyView1} />}
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    console.log("item.score", item);
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
          {/* <View style={styles.checkBoxView} /> */}
        </View>

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.elearnId}
        </Text>

        <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
          {item.elearnModTitle}
        </Text>

        {is400 && (
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
            <Text style={styles.progressTxt}>{item.score / 10} %</Text>
          </View>
        )}
        {is500 && (
          <>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt, styles.sBlack, styles.left]}>
              {item.score}
            </Text>

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
          </>
        )}
        {isLess400 && (
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
      />
    </Fragment>
  );
};

export default Table;
