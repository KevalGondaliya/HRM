import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { View, SafeAreaView, TextInput, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Colors from '../../../theme';
import Header from '../../../component/Header';
import DropDown from '../../../component/DropDown';
import { eLearningIndiArr, dropDownData } from '../../../dummyData';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import { useDispatch, useSelector } from 'react-redux';

const ELearningProgressIndividual = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const editData = route?.params?.data;
  console.log(editData);
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);
  const token = useSelector(state => state.session?.token);
  const elearning = useSelector(
    state => state.elearning?.elearnProgressDataById,
  );
  console.log('elearning', elearning);
  const isLoading = useSelector(
    state => state.loading.effects.elearning?.getProgressDataById,
  );

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (editData) {
    }
  }, [editData]);

  const getData = () => {
    dispatch.elearning.getProgressDataById({ token, id: editData?.userId });
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={editData?.user_name}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl onRefresh={getData} refreshing={isLoading} />
        }
        showsVerticalScrollIndicator={false}>
        <ScreenDescription
          description1={'View all e-learning progress of an'}
          description2={'employee. Click on the respective button'}
          description3={'to edit or view the details'}
        />

        {/* <View style={styles.searchIconView}>
          <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholder={'Search Query…'}
            placeholderTextColor={Colors.lightRed}
          />
        </View> */}

        {/* <DropDown
          placeholder="By Department…"
          open={openDepartment}
          value={departmentValue}
          items={departmentArr}
          setOpen={setOpenDepartment}
          setValue={setDepartmentValue}
          setItems={setDepartmentArr}
          dropDownStyle={styles.dropDownView}
        /> */}

        <Table
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          data={elearning}
          pageCurrent={pageCurrent}
          setpageCurrent={setpageCurrent}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ELearningProgressIndividual;
