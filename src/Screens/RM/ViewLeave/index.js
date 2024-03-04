import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Header from '../../../component/Header';
import Button from '../../../component/Button';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';

const ViewLeave = ({navigation}) => {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);

  const applyBtn = () => {
    navigation.navigate('ApplyLeave');
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);
  const isLeaveDataLoading = useSelector(
    state => state.loading.effects.leaveTransactions,
  );

  const leaveData = useSelector(state => state.leaveTransactions);

  useEffect(() => {
    getLeaveData();
  }, []);

  const getLeaveData = () => {
    dispatch.leaveTransactions.getLeavrByUser({token, id: user?.id});
  };

  const onDeleteBtnPress = id => {
    console.log(id);
    dispatch.leaveTransactions.delete({
      token,
      id: id,
      userId: user?.id,
    });
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('ApplyLeave', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('ApplyLeave', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  useEffect(() => {
    if (leaveData.isDelLeaveTransactions) {
      setIsModalVisible(false);
      dispatch.leaveTransactions.saveDelLeaveTransactions(false);
    }
  }, [leaveData.isDelLeaveTransactions]);

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'View All Leave'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getLeaveData}
            refreshing={isLeaveDataLoading.getLeavrByUser}
          />
        }
        showsVerticalScrollIndicator={false}
        style={style.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'View all of your applied leaves and track '}
          description2={'status here. Click on the respective'}
          description3={'button to edit or view the details'}
        />

        <View style={style.searchBtnView}>
          {/* <Button
            label={'Export Leaves Report'}
            btnStyle={style.browseBtn}
            labelStyle={style.browseTxt}
          /> */}

          <Button
            label={'Apply Leave'}
            btnStyle={style.browseBtn}
            labelStyle={style.browseTxt}
            onPress={applyBtn}
          />
        </View>

        <Table
          data={leaveData?.leaveDataById}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onDeleteBtnPress={onDeleteBtnPress}
          eyeIconPress={eyeBtnPress}
          editBtnPress={editBtnPress}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ViewLeave;
