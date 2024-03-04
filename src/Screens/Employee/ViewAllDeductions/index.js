import {RefreshControl, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Header from '../../../component/Header';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

const ViewAllDeductions = ({navigation}) => {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const deductionByUserData = useSelector(state => state.applyNewDeductions);

  const isDeductionByUserLoading = useSelector(
    state => state.loading.effects.applyNewDeductions,
  );
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);

  useEffect(() => {
    getDeductionData();
  }, []);

  const getDeductionData = () => {
    dispatch.applyNewDeductions.getDeductionDataByUser({token, id: user?.id});
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'View All Deductions'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getDeductionData}
            refreshing={isDeductionByUserLoading?.getDeductionDataByUser}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ScreenDescription
          description1={'View all of your deductions here.'}
          description2={
            'Click on the respective button to edit or view the details.'
          }
        />

        <Table
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          pageCurrent={pageCurrent}
          setpageCurrent={setpageCurrent}
          data={deductionByUserData?.deductionsDataByUser}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ViewAllDeductions;
