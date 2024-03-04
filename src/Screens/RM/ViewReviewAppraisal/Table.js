import moment from 'moment';
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import TbModal from './TbModal';
import Colors from '../../../theme';
import DataTable from '../../../component/DataTable';
import { useWindowDimensions } from '../../../dummyData';

const Table = props => {
  const deviceWidth = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState('');

  const onMoreBtnPress = item => {
    setIsModalVisible(true);
    setModalData(item);
  };
  const onCloseBtnPress = item => {
    setIsModalVisible(false);
  };

  const ListHeader = () => {
    return (
      <View style={styles.headerMainView}>
        <Text style={styles.headerTxt}>APPRAISALS</Text>
        <View style={[styles.headerStyle]}>
          <View style={styles.emptyView} />
          <View style={styles.headerDate}>
            <Text style={styles.userNameTxt}>Appraisal ID</Text>
          </View>
          <View style={styles.headerDate}>
            <Text style={styles.userNameTxt}>Reviewer</Text>
          </View>
          {deviceWidth > 400 && (
            <View style={styles.headerDate}>
              <Text style={styles.userNameTxt}>Start Date</Text>
            </View>
          )}
          {deviceWidth > 500 && (
            <>
              <View style={styles.headerDate}>
                <Text style={styles.userNameTxt}>Status</Text>
              </View>
              <View style={styles.emptyView2} />
            </>
          )}

          {(deviceWidth < 400 || deviceWidth < 500) && (
            <View style={styles.emptyView1} />
          )}
        </View>
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
        <View style={styles.emptyView}>
          <View style={styles.checkBoxView} />
        </View>
        <View style={styles.headerDate}>
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.id}
          </Text>
        </View>
        <View style={styles.headerDate}>
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.empName}
          </Text>
        </View>
        {deviceWidth > 400 && (
          <View style={styles.headerDate}>
            <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
              {moment(item.createdAt).format('YYYY MMM DD')}
            </Text>
          </View>
        )}
        {deviceWidth > 500 && (
          <>
            <View style={styles.headerDate}>
              <Text
                numberOfLines={1}
                style={[styles.userNameTxt, styles.sBlack]}>
                {item.status}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onMoreBtnPress(item)}
              style={styles.emptyView2}>
              <Icon
                name={'plus'}
                type={'entypo'}
                size={scale(23)}
                color={Colors.sBlack}
              />
            </TouchableOpacity>
          </>
        )}
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
      </View>
    );
  };

  const onLeftBtnPress = () => {
    if (props.pageCurrent > 1) {
      props.setPrve(props.prve - 5);
      props.setNext(props.next - 5);
      props.setpageCurrent(props.pageCurrent - 1);
    }
  };

  const onRightBtnPress = () => {
    props.setPrve(props.prve + 5);
    props.setNext(props.next + 5);
    props.setpageCurrent(props.pageCurrent + 1);
  };

  return (
    <View style={styles.containerView}>
      <DataTable
        pageCurrent={props.pageCurrent}
        data={props.data?.slice(props.prve, props.next)}
        onRightBtnPress={() => {
          onRightBtnPress();
        }}
        onLeftBtnPress={() => {
          onLeftBtnPress();
        }}
        renderItem={renderItem}
        ListHeader={ListHeader}
        dataArr={props.data}
        next={props.next}
      />

      <TbModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseBtnPress}
        modalData={modalData}
        eyeIconPress={() => props.eyeIconPress(modalData)}
      />
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  headerMainView: {
    height: scale(60),
    backgroundColor: Colors.blackPearl,
    paddingHorizontal: scale(15),
    justifyContent: 'center',
  },
  headerTxt: {
    fontSize: scale(13),
    fontWeight: '700',
    color: Colors.white,
    top: scale(8),
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerDate: {
    width: scale(120),
    height: '100%',
    justifyContent: 'center',
  },
  headerIcon: {
    width: scale(150),
    height: '100%',
    justifyContent: 'center',
  },
  headerBouns: {
    width: scale(130),
    height: '100%',
    justifyContent: 'center',
  },
  headerStatus: {
    width: scale(165),
    height: '100%',
    justifyContent: 'center',
  },
  userNameTxt: {
    fontSize: scale(10),
    color: Colors.white,
    fontWeight: '500',
  },
  iconMainView: {
    width: '95%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyeIcon: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  tbView: {
    paddingHorizontal: scale(15),
    height: scale(50),
  },
  containerView: {
    paddingHorizontal: scale(10),
    marginTop: scale(20),
  },
  editIcon: scale(20),
  emptyView1: { width: scale(35), height: '100%', justifyContent: 'center' },
  emptyView2: { width: scale(150), height: '100%', justifyContent: 'center' },
  sBlack: { color: Colors.sBlack },
});
