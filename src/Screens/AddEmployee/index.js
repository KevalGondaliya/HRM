import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../component/Header';
import AddEmployees from './AddEmployee';
import SaveCancelBtn from '../../component/SaveCancelBtn';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';

function AddEmployee({route, navigation}) {
  const dispatch = useDispatch();
  const isView = route?.params?.isView;
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [empType, setEmpType] = useState('');

  const isLoading = useSelector(
    state => state.loading.effects.employees.setEmployee,
  );
  const isEditLoading = useSelector(
    state => state.loading.effects.branch.editBranch,
  );

  const token = useSelector(state => state.session?.token);

  const addEmployees = useSelector(state => state.employees.employee);

  useEffect(() => {
    if (addEmployees) {
      cancelBtn();
      dispatch.employees.saveEmployee(null);
    }
  }, [addEmployees]);

  const onSaveBtnPress = () => {
    if (userName != '' && email != '' && empType != '') {
      setIsError(false);
      let data = {
        user_type: empType,
        user_name: userName,
        email: email,
      };

      dispatch.employees.setEmployee({token, data});
    } else {
      setIsError(true);
    }
  };

  const refresh = () => {
    setIsError(false);
    setUserName('');
    setEmail('');
    setEmpType('');
  };

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Employee'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription description1={'Fill in the respective fields.'} />

        <AddEmployees
          isView={isView}
          isError={isError}
          email={email}
          setEmail={setEmail}
          setUserName={setUserName}
          userName={userName}
          empType={empType}
          setEmpType={setEmpType}
        />

        <SaveCancelBtn
          label={'Save'}
          cancelBtn={cancelBtn}
          submitBtn={onSaveBtnPress}
          saveLoading={isLoading || isEditLoading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddEmployee;
