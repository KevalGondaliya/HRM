import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {View, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Header from '../../../component/Header';
import {empPayslipTbData} from '../../../dummyData';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

function EmpPaySlip({navigation}) {
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Payslip'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'View all of your payslips here. Click on the'}
          description2={'respective button to edit or view the details'}
        />

        <View style={styles.searchBtnView}>
          <View style={styles.searchIconView}>
            <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
            <TextInput
              style={styles.searchInput}
              placeholder={'Search Query…'}
              placeholderTextColor={Colors.lightRed}
              onChangeText={setSearch}
              value={search}
            />
          </View>
        </View>

        <Table
          data={empPayslipTbData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default EmpPaySlip;
