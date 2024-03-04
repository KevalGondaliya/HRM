import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Settings from './Settings';
import Header from '../../../component/Header';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import Validator from '../../../utility/validator';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

function AddAdministrator({route, navigation}) {
  const dispatch = useDispatch();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isLoading = useSelector(
    state => state.loading.effects.employees.setEmployee,
  );
  const isUpdateUserLoading = useSelector(
    state => state.loading.effects.employees.editEmployee,
  );

  const token = useSelector(state => state.session?.token);

  const addEmployees = useSelector(state => state.employees.employee);
  const isEditAdmin = useSelector(state => state.employees.isEditAdmin);

  const refresh = () => {
    setIsError(false);
    setUserName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  useEffect(() => {
    if (editData) {
      setUserName(editData?.user_name);
      setEmail(editData?.email);
      setPassword(editData?.password);
      setConfirmPassword(editData?.password);
    }
  }, [editData]);

  useEffect(() => {
    if (addEmployees || isEditAdmin) {
      cancelBtn();
      dispatch.employees.saveEmployee(null);
      dispatch.employees.setUpdateAdmin(false);
    }
  }, [addEmployees || isEditAdmin]);

  const onSaveBtnPress = () => {
    if (
      Validator.validateTextInput(userName) != '' &&
      Validator.validateTextInput(password) != '' &&
      Validator.validateTextInput(password) === confirmPassword
    ) {
      setIsError(false);
      let data = {
        user_type: 'Admin',
        user_name: userName,
        email: email,
        password: confirmPassword,
      };

      if (isEdit) {
        dispatch.employees.editEmployee({token, data, id: editData?.id});
      } else {
        dispatch.employees.setEmployee({token, data});
      }
    } else {
      setIsError(true);
    }
  };

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Administrator Accounts'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={
            'Fill in the respective fields for your administrator profile.'
          }
        />

        <Settings
          isError={isError}
          userName={userName}
          setUserName={setUserName}
          email={email}
          setEmail={setEmail}
          isEdit={isEdit}
          isView={isView}
          editData={editData}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={onSaveBtnPress}
          label={'Save'}
          saveLoading={isLoading || isUpdateUserLoading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddAdministrator;
