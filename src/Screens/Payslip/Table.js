import {Icon} from 'react-native-elements';
import React, {Fragment, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {Text, TouchableOpacity, View} from 'react-native';

import Colors from '../../theme';
import TableModal from './TableModal';
import DataTable from '../../component/DataTable';
import {useWindowDimensions} from '../../dummyData';

import styles from './style';

const Table = props => {
  const deviceWidth = useWindowDimensions();

  const [isModalVisible, setIsModalVisible] = useState(false);
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
      <View style={styles.headerMainView}>
        <Text style={styles.headerTxt}>BREAKDOWN</Text>
        <View style={styles.headerStyle}>
          <View style={styles.headerDate}>
            <Text style={styles.userNameTxt}>Item Name</Text>
          </View>
          {(deviceWidth < 400 || deviceWidth < 500) && (
            <View style={styles.emptyView1} />
          )}
          {deviceWidth > 400 && (
            <Fragment>
              <View style={styles.headerBouns}>
                <Text style={styles.userNameTxt}>Amount</Text>
              </View>
              <View style={[styles.headerBouns, styles.width30]} />
            </Fragment>
          )}
        </View>
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
        <View style={styles.headerDate}>
          <Text
            numberOfLines={1}
            style={[styles.userNameTxt, {color: Colors.sBlack}]}>
            {item.itemName}
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
        {deviceWidth > 400 && (
          <Fragment>
            <View style={styles.headerBouns}>
              <View style={styles.amountView}></View>
            </View>
            <TouchableOpacity style={[styles.headerBouns, styles.width30]}>
              <Icon
                name={'close'}
                type={'AntDesign'}
                size={scale(20)}
                color={Colors.blackPearl}
              />
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    );
  };

  return (
    <View style={styles.tbContainerView}>
      <DataTable
        data={props.data}
        renderItem={renderItem}
        ListHeader={ListHeader}
        isPaginate={true}
      />
      <TouchableOpacity style={styles.addMoreView}>
        <Icon
          name={'plus'}
          type={'feather'}
          size={scale(25)}
          color={Colors.white}
        />

        <Text style={styles.addMoreTxt}>Add More</Text>
      </TouchableOpacity>

      <TableModal
        isModalVisible={isModalVisible}
        modalData={modalData}
        onCloseModal={onCloseModal}
      />
    </View>
  );
};

export default Table;
