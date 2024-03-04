import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Icon} from 'react-native-elements';
import {View, TextInput} from 'react-native'; 
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Header from '../../../component/Header'; 
import DropDown from '../../../component/DropDown';
import {dropDownData, empAppraisalsTbData} from '../../../dummyData';
import ScreenDescription from '../../../component/ScreenDescription';

import style from './style';

const EmpNominatedAppraisal = ({navigation}) => {
  const isError = false;
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [search, setSearch] = useState('');
  const [pageCurrent, setpageCurrent] = useState(1);
  const [statusTypeValue, setStatusTypeValue] = useState('');
  const [openStatusType, setOpenStatusType] = useState(false);
  const [statusTypeArr, setStatusTypeArr] = useState(dropDownData);

  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'Nominated Appraisals'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
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
              onChangeText={setSearch}
              value={search}
            />
          </View>

          <DropDown
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
          />
        </View>

        <Table
          data={empAppraisalsTbData}
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
};

export default EmpNominatedAppraisal;
