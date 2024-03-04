import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../theme';
import TableModal from './TableModal';
import eye from '../../assets/svg/eye.svg';
import DataTable from '../../component/DataTable';
import { useWindowDimensions } from '../../dummyData';

import styles from './style';

const Table = props => {
  const deviceWidth = useWindowDimensions();
  const [modalData, setDate] = useState('');
  // const [isModalVisible, setIsDataModalVisible] = useState(false);

  const [organisationName, setOrganisationName] = useState('');
  const ediDepartment = useSelector(state => state.department?.editDepartment);
  const delDepartment = useSelector(state => state.department?.delDepartment);

  const onMoreBtnPress = item => {
    props.setIsDataModalVisible(true);
    setDate(item);
  };

  const onCloseModal = () => {
    props.setIsDataModalVisible(false);
  };

  useEffect(() => {
    props.setIsDataModalVisible(false);
  }, [ediDepartment || delDepartment]);

  const ListHeader = item => {
    return (
      // <View style={styles.headerMainView}>
      <View style={[styles.headerStyle, styles.headerMainView]}>
        <View style={styles.headerDate}>
          <Text style={styles.userNameTxt}>Department</Text>
        </View>
        <View style={styles.headerDate}>
          <Text style={styles.userNameTxt}>Positions</Text>
        </View>

        {deviceWidth > 600 && (
          <>
            <View style={styles.headerBouns}>
              {/* <Text style={styles.userNameTxt}>No. of Employees</Text> */}
            </View>
            <View style={styles.iconMainView} />
          </>
        )}
        {(deviceWidth < 400 || deviceWidth < 500) && (
          <View style={styles.emptyView1} />
        )}
      </View>
      // </View>
    );
  };

  const renderItem = ({ item, index }) => {
    setOrganisationName(item?.organisationName);
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
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.department}
          </Text>
        </View>
        <View style={styles.headerDate}>
          <Text numberOfLines={1} style={[styles.userNameTxt, styles.sBlack]}>
            {item.positionCount} Positions
          </Text>
        </View>

        {deviceWidth > 600 && (
          <>
            <View style={styles.headerBouns}>
              <Text
                numberOfLines={1}
                style={[styles.userNameTxt, styles.sBlack]}>
                {/* {item.noOfEmp} */}
              </Text>
            </View>

            <View style={styles.iconMainView}>
              <TouchableOpacity onPress={props.editIconPress}>
                <Icon
                  name={'edit'}
                  type={'materialicons'}
                  color={Colors.blackPearl}
                  size={styles.editIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={props.eyeIconPress}>
                <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
              </TouchableOpacity>

              <TouchableOpacity onPress={props.onDelBtnPree}>
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
    <View style={styles.tbContainerView}>
      <DataTable
        pageCurrent={props.pageCurrent}
        data={props.data?.slice(props.prve, props.next)}
        onRightBtnPress={onRightBtnPress}
        onLeftBtnPress={onLeftBtnPress}
        renderItem={renderItem}
        dataArr={props.data}
        next={props.next}
        ListHeader={ListHeader}
      />

      <TableModal
        isModalVisible={props.isDataModalVisible}
        onCloseModal={onCloseModal}
        modalData={modalData}
        editIconPress={() => {
          props.setIsDataModalVisible(false);
          props.editIconPress(modalData);
        }}
        eyeIconPress={() => {
          props.setIsDataModalVisible(false);
          props.eyeIconPress(modalData);
        }}
        onDelBtnPree={() => {
          props.onDelBtnPree(modalData), props.setIsDataModalVisible(false);
        }}
      />
    </View>
  );
};

export default Table;
