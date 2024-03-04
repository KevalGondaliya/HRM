import React, {useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import MassOnboard from './MassOnboard';
import SingleButton from './SingleButton';
import SingleOnBoard from './SingleOnBoard';
import Header from '../../../component/Header';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';

const OnboardEmployees = ({navigation}) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [count, setCount] = useState(0);
  const [empValue, setEmpValue] = useState('');
  const [empArr, setEmpArr] = useState('');
  const [uploadDocument, setUploadDocument] = useState('');
  const [singleOnBoard, setSingleOnBoard] = useState(true);
  const [identificationNumber, setIdentificationNumber] = useState('');
  const token = useSelector(state => state.session?.token);
  const userData = useSelector(state => state.employees);
  const isLoading = useSelector(state => state.loading.effects.employees.get);
  const employeesInfo = useSelector(state => state.employees);
  useEffect(() => {
    if (employeesInfo.onBoard?.status == 200) {
      dispatch.employees.saveOnBoard(null);
      setEmpValue('');
    }
  }, [employeesInfo]);

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.xls],
      });
      setUploadDocument(response[0].name);
      setCount(count + 1);
    } catch (err) {}
  };

  const massSubmitBtn = () => {};

  const removeBtnPress = () => {
    setUploadDocument('');
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    getEmp();
  }, []);

  const getEmp = () => {
    dispatch.employees.get({token});
  };

  useEffect(() => {
    if (userData) {
      let arr = userData?.userData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].email, value: arr[i].id});
      }
      setEmpArr(dropDownArr);
    }
  }, [userData]);

  const submitBtn = () => {
    if (empValue != '') {
      setIsError(false);
      dispatch.employees.savePersonalInfo(null);
      navigation.navigate('OnboardEmployeesSingle', {id: empValue});
    } else {
      setIsError(true);
    }
  };

  const cancelBtn = () => {
    setEmpValue('');
    setIsError(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Onboard Employees'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl onRefresh={getEmp} refreshing={isLoading} />
        }
        showsVerticalScrollIndicator={false}
        style={styles.midView}>
        <ScreenDescription
          description1={'Onboard employees individually'}
          description2={'or through an Excel file.'}
        />

        <SingleButton
          singleOnBoard={singleOnBoard}
          setSingleOnBoard={setSingleOnBoard}
        />

        {singleOnBoard ? (
          <SingleOnBoard
            isError={isError}
            empValue={empValue}
            empArr={empArr || []}
            identificationNumber={identificationNumber}
            setEmpValue={setEmpValue}
            setSingleOnBoard={setSingleOnBoard}
            setIdentificationNumber={setIdentificationNumber}
            submitBtn={submitBtn}
            cancelBtn={cancelBtn}
          />
        ) : (
          <MassOnboard
            isError={isError}
            uploadDocument={uploadDocument}
            handleDocumentSelection={handleDocumentSelection}
            removeBtnPress={removeBtnPress}
            setSingleOnBoard={setSingleOnBoard}
            submitBtn={massSubmitBtn}
          />
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default OnboardEmployees;
