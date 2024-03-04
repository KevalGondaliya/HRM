import {RefreshControl, SafeAreaView} from 'react-native';
import {Icon} from 'react-native-elements';
import {View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import EmpTable from './EmpTable';
import Colors from '../../../theme';
import Header from '../../../component/Header';
import DropDown from '../../../component/DropDown';
import {dropDownData, rmAppraisalsTbData} from '../../../dummyData';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';
import _ from 'lodash';

const EmpAppraisal = ({navigation}) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [empPrve, setEmpPrve] = useState(0);
  const [empNext, setEmpNext] = useState(5);
  const [search, setSearch] = useState('');
  const [empPageCurrent, setEmpPageCurrent] = useState(1);
  const [statusTypeValue, setStatusTypeValue] = useState('');
  const [openStatusType, setOpenStatusType] = useState(false);
  const [statusTypeArr, setStatusTypeArr] = useState(dropDownData);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const token = useSelector(state => state.session?.token);
  const pandingAppraisalData = useSelector(
    state => state.appraisalTemplates?.pandingAppraisalData,
  );
  const peerAppraisalData = useSelector(
    state => state.addAppraisalCycles?.pandingPeerAppraisalData,
  );

  const isPendingLoading = useSelector(
    state => state.loading.effects.appraisalTemplates,
  );

  useEffect(() => {
    getPandingAppraisalData();
  }, []);

  const getPandingAppraisalData = () => {
    dispatch.appraisalTemplates.getPandingAppraisal({token});
    dispatch.addAppraisalCycles.getPeerPandingAppraisal({token});
  };

  const searchData = e => {
    dispatch.appraisalTemplates.getPandingAppraisal({token, e});
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  const eyeBtnPress = item => {
    setIsModalVisible(false);
    navigation.navigate('ReviewAppraisals', {
      data: item,
      isEdit: false,
      isView: true,
    });
  };

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'Review Appraisals'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getPandingAppraisalData}
            refreshing={isPendingLoading.getPandingAppraisal}
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
          data={pandingAppraisalData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          onPress={() => navigation.navigate('ReviewAppraisals', {})}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          eyeIconPress={eyeBtnPress}
        />

        <EmpTable
          data={peerAppraisalData}
          pageCurrent={empPageCurrent}
          next={empNext}
          prve={empPrve}
          setPrve={setEmpPrve}
          setNext={setEmpNext}
          setpageCurrent={setEmpPageCurrent}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmpAppraisal;
