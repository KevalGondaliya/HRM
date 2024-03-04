import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Header from '../../component/Header';
import {payslipTbData} from '../../dummyData';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';

function PaySlip({navigation}) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.session?.token);

  useEffect(() => {
    dispatch.company.get({token});
  }, []);
  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Stanwin’s Payslip'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Manage specific employee’s within'}
          description2={'the company here. Edit the fields'}
          description3={'if there are any discrepancies.'}
        />

        <Table data={payslipTbData} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default PaySlip;
