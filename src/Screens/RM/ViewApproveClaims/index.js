import React, {useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView} from 'react-native';
import {scale} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Header from '../../../component/Header';
import {viewApproveClaimsTbData} from '../../../dummyData';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';
import {useDispatch, useSelector} from 'react-redux';

const ViewApproveClaims = ({navigation}) => {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);

  const token = useSelector(state => state.session?.token);
  const isClaimLoading = useSelector(
    state => state.loading.effects.applyClaims,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const ClaimData = useSelector(state => state.applyClaims);

  useEffect(() => {
    getClaimsData();
  }, []);

  const getClaimsData = () => {
    dispatch.applyClaims.pendingData({token});
    dispatch.claimTypes.get({token});
    dispatch.claimTypesCategory.get({token});
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('ApproveIndividualClaims', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'Approve Claims'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getClaimsData}
            refreshing={isClaimLoading.get}
          />
        }
        showsVerticalScrollIndicator={false}
        style={style.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'Approve your employee’s claims here.'}
          description2={'Click on the respective button to or view the details'}
          txtStyle={{fontSize: scale(12)}}
        />

        <Table
          data={ClaimData?.pendingClaimsData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          eyeIconPress={eyeBtnPress}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ViewApproveClaims;
