import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RefreshControl, SafeAreaView} from 'react-native';
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
  const appraisaluserByData = useSelector(state => state.allowanceTransactions);

  const isAppraisaluserByLoading = useSelector(
    state => state.loading.effects.allowanceTransactions,
  );
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);

  useEffect(() => {
    getAllownceData();
  }, []);

  const getAllownceData = () => {
    dispatch.allowanceTransactions.getAllownceByUser({token, id: user?.id});
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'View All Allowances'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getAllownceData}
            refreshing={isAppraisaluserByLoading?.getAllownceByUser}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ScreenDescription
          description1={'View all of your allowances here.'}
          description2={'Click on the respective button to edit or view '}
          description3={'the details.'}
        />

        <Table
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          pageCurrent={pageCurrent}
          setpageCurrent={setpageCurrent}
          data={appraisaluserByData?.allowanceTransactionsDataByUser}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ViewAllDeductions;
