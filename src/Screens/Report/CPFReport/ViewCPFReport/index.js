/* eslint-disable quotes */
import {View} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../../theme';
import Header from '../../../../component/Header';
import TextInput from '../../../../component/TextInput';
import ReportHeader from '../../../../component/ReportHeader';
import SaveCancelBtn from '../../../../component/SaveCancelBtn';
import {irasDataArray, ViewCPFReportData} from '../../../../dummyData';
import ScreenDescription from '../../../../component/ScreenDescription';

import styles from './style';

function ViewCPFReport({navigation}) {
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [search, setSearch] = useState('');
  const [pageCurrent, setpageCurrent] = useState(1);

  const irasData = irasDataArray;

  const cancelBtn = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={`CPF Report`}
        labelStyle={styles.headerLabel}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={`Download an excel file of organization's CPF transactions.`}
        />

        <ReportHeader data={irasData} />

        {/* <View style={styles.searchIconView}>
          <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
          <TextInput
            style={styles.searchInput}
            placeholder={'Search Query…'}
            placeholderTextColor={Colors.lightRed}
            onChangeText={setSearch}
            value={search}
          />
        </View> */}

        <Table
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          pageCurrent={pageCurrent}
          data={ViewCPFReportData}
          setpageCurrent={setpageCurrent}
        />

        <SaveCancelBtn
          label={'Download'}
          cancelLabel={'Back'}
          style={styles.top}
          cancelBtn={cancelBtn}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ViewCPFReport;
