import {View} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Header from '../../../component/Header';
import Button from '../../../component/Button';
import TextInput from '../../../component/TextInput';
import {viewPayRollTbData} from '../../../dummyData';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

function ViewPayrolls({navigation}) {
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [search, setSearch] = useState('');
  const [pageCurrent, setpageCurrent] = useState(1);

  const downloadBtnPress = () => {
    navigation.navigate('PayslipTemplates');
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Payrolls'}
        labelStyle={styles.headerLabel}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={'Manage all payrolls within'}
          description2={'the company here. Click on the respective'}
          description3={'button to edit or view the details'}
        />

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

        <Button
          btnStyle={styles.btnStyle}
          labelStyle={styles.labelStyle}
          label={'Download All Payslips'}
          onPress={downloadBtnPress}
        />

        <Table
          data={viewPayRollTbData}
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

export default ViewPayrolls;
