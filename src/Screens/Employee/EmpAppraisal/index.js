import _ from 'lodash';
import {Icon} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, TextInput, SafeAreaView, RefreshControl} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import style from './style';
import Table from './Table';
import Colors from '../../../theme';
import Header from '../../../component/Header';
import Button from '../../../component/Button';
import {dropDownData} from '../../../dummyData';
import ScreenDescription from '../../../component/ScreenDescription';

const EmpAppraisal = ({navigation}) => {
  const isError = false;
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [statusTypeValue, setStatusTypeValue] = useState('');
  const [openStatusType, setOpenStatusType] = useState(false);
  const [statusTypeArr, setStatusTypeArr] = useState(dropDownData);

  const appraisaluserByData = useSelector(state => state.appraisalTemplates);

  const isAppraisaluserByLoading = useSelector(
    state => state.loading.effects.appraisalTemplates,
  );
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);

  useEffect(() => {
    getAppraisalData();
  }, []);

  const getAppraisalData = () => {
    dispatch.appraisalTemplates.getAppraisalByUserData({token, id: user?.id});
  };

  const onNomiBtnPress = () => {
    navigation.navigate('EmpNominatedAppraisal');
  };

  const searchData = e => {
    dispatch.appraisalTemplates.getAppraisalByUserData({
      token,
      id: user?.id,
      e,
    });
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
            refreshing={isAppraisaluserByLoading?.getAppraisalByUserData}
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
          data={appraisaluserByData?.appraisalByUserData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
        />

        <Button
          label={'Nominate for Peer Appraisal'}
          btnStyle={style.browseBtn}
          labelStyle={style.browseTxt}
          onPress={onNomiBtnPress}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmpAppraisal;
