import _ from 'lodash';
import { RefreshControl, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Header from '../../../component/Header';
import Button from '../../../component/Button';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';
import { useDispatch, useSelector } from 'react-redux';

const EmpViewAllClaims = ({ navigation }) => {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);

  const onApplyClaimPress = () => {
    navigation.navigate('EmpApplyClaims');
  };
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);
  const isClaimLoading = useSelector(
    state => state.loading.effects.applyClaims,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const ClaimData = useSelector(state => state.applyClaims);

  useEffect(() => {
    getClaimsData();
  }, []);

  const getClaimsData = () => {
    dispatch.applyClaims.get({ token, userId: user?.id });
    dispatch.claimTypes.get({ token });
    dispatch.claimTypesCategory.get({ token });
  };

  const onDeleteBtnPress = id => {
    dispatch.applyClaims.delete({
      token,
      id: id,
      userId: user?.id,
    });
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('EmpApplyClaims', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('EmpApplyClaims', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  useEffect(() => {
    if (ClaimData.isDelApplyClaims) {
      setIsModalVisible(false);
      dispatch.applyClaims.setDelApplyClaims(false);
    }
  }, [ClaimData.isDelApplyClaims]);

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'View All Claims'}
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
          description1={'View all of your applied claims and track'}
          description2={'status here. Click on the respective'}
          description3={'button to edit or view the details'}
        />

        <View style={style.searchBtnView}>
          <View btnStyle={style.browseBtn} />
          {/* <Button
            label={'Export Claim Report'}
            btnStyle={style.browseBtn}
            labelStyle={style.browseTxt}
          /> */}

          <Button
            label={'Apply Claim'}
            btnStyle={style.browseBtn}
            labelStyle={style.browseTxt}
            onPress={onApplyClaimPress}
          />
        </View>

        <Table
          data={ClaimData?.applyClaimsData}
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

export default EmpViewAllClaims;
