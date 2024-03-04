import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Settings from './Settings';
import Header from '../../../component/Header';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';

function LeaveSettings({navigation}) {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  const [isAdditionalLeave, setIsAdditionalLeave] = useState(true);
  const token = useSelector(state => state.session?.token);
  const leaveData = useSelector(state => state.leave);
  const isLeaveLoading = useSelector(state => state.loading.effects.leave);

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  useEffect(() => {
    if (leaveData.leaveSettingData) {
      dispatch.leave.setLeaveSettings(null);
      cancelBtn();
    }
  }, [leaveData.leaveSettingData]);

  const refresh = () => {
    setIsAdditionalLeave(true);
  };

  const onSaveBtnPress = () => {
    let data = {
      setting: isAdditionalLeave,
    };

    dispatch.leave.setLeaveSetting({token, data});
  };
  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Leave Settings'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={'Manage leave settings within the company here.'}
        />

        <Settings
          isError={isError}
          setIsAdditionalLeave={setIsAdditionalLeave}
          isAdditionalLeave={isAdditionalLeave}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={onSaveBtnPress}
          label={'Save'}
          saveLoading={isLeaveLoading.setLeaveSetting}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default LeaveSettings;
