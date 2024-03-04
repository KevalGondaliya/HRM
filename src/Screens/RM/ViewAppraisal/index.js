import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Header from '../../../component/Header';
import Button from '../../../component/Button';
// import DropDown from '../../../component/DropDown';
// import {dropDownData} from '../../../dummyData';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import EmpTable from './EmpTable';

const EmpAppraisal = ({ navigation }) => {
  // const isError = false;
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  // const [search, setSearch] = useState('');
  const [pageCurrent, setpageCurrent] = useState(1);
  // const [statusTypeValue, setStatusTypeValue] = useState('');
  // const [openStatusType, setOpenStatusType] = useState(false);
  // const [statusTypeArr, setStatusTypeArr] = useState(dropDownData);
  const [empPrve, setEmpPrve] = useState(0);
  const [empNext, setEmpNext] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [empPageCurrent, setEmpPageCurrent] = useState(1);
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);

  const appraisalData = useSelector(state => state.appraisal);

  const isAppraisalLoading = useSelector(
    state => state.loading.effects.appraisal,
  );

  const onNomiBtnPress = () => {
    navigation.navigate('NominateforPeerAppraisal');
  };

  useEffect(() => {
    if (appraisalData.isDelAppraisal) {
      setIsModalVisible(false);
      dispatch.appraisal.saveDelAppraisal(false);
    }
  }, [appraisalData.isDelAppraisal]);

  const onDeleteBtnPress = id => {
    dispatch.appraisal.delete({
      token,
      id: id,
    });
  };

  const editBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('NominateforPeerAppraisal', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('NominateforPeerAppraisal', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  useEffect(() => {
    getAppraisalData();
  }, []);

  const getAppraisalData = () => {
    dispatch.appraisal.get({ token });
    dispatch.appraisal.getPeerAppraisalData({ token });
  };

  const searchData = e => {
    dispatch.appraisal.get({ token, id: user.id, e });
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'Appraisals'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getAppraisalData}
            refreshing={isAppraisalLoading?.get}
          />
        }
        showsVerticalScrollIndicator={false}
        style={style.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'View all of your current and past'}
          description2={'appraisals here. Click on the respective'}
          description3={'button to edit or view the details'}
        />

        <View style={style.searchBtnView}>
          <View style={style.searchIconView}>
            <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
            <TextInput
              style={style.searchInput}
              placeholder={'Search Query…'}
              placeholderTextColor={Colors.lightRed}
              onChangeText={e => debounce_fun(e)}
            />
          </View>

          {/* <DropDown
            placeholder="By Status…"
            open={openStatusType}
            value={statusTypeValue}
            items={statusTypeArr}
            setOpen={setOpenStatusType}
            setValue={setStatusTypeValue}
            setItems={setStatusTypeArr}
            dropDownDirection={'BOTTOM'}
            isError={isError}
            dropDownStyle={style.dropDownStyle}
          /> */}
        </View>

        <Table
          data={appraisalData.appraisalData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          onPress={() => navigation.navigate('ViewReviewAppraisal')}
        />

        <Button
          label={'Nominate for Peer Appraisal'}
          btnStyle={style.browseBtn}
          labelStyle={style.browseTxt}
          onPress={onNomiBtnPress}
        />

        <EmpTable
          data={appraisalData?.prreAppraisalData}
          pageCurrent={empPageCurrent}
          next={empNext}
          prve={empPrve}
          setPrve={setEmpPrve}
          setNext={setEmpNext}
          setpageCurrent={setEmpPageCurrent}
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

export default EmpAppraisal;
