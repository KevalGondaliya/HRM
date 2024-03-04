import React, {useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView} from 'react-native';
import {scale} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Header from '../../../component/Header';
import {viewApproveLeavesTbData} from '../../../dummyData';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';
import {useDispatch, useSelector} from 'react-redux';

const ViewApproveLeaves = ({navigation}) => {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);

  const token = useSelector(state => state.session?.token);
  const isLeaveLoading = useSelector(state => state.loading.effects.leave);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const leaveData = useSelector(state => state.leave);

  useEffect(() => {
    getLeaveData();
  }, []);

  const getLeaveData = () => {
    dispatch.leave.getPendingLeave({token});
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('ApproveIndividualLeave', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'Approve Leaves'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getLeaveData}
            refreshing={isLeaveLoading.getPendingLeave}
          />
        }
        showsVerticalScrollIndicator={false}
        style={style.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'Approve your employee’s leaves here.'}
          description2={'Click on the respective button to or view the details'}
          txtStyle={{fontSize: scale(12)}}
        />

        <Table
          data={leaveData?.pendingLeaveList}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          eyeBtnPress={eyeBtnPress}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ViewApproveLeaves;
