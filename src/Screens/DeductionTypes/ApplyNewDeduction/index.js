import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import DocumentPicker, {types} from 'react-native-document-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../../component/Header';
import ApplyNewDeduction from './ApplyNewDeduction';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import Validator from '../../../utility/validator';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import {useIsFocused} from '@react-navigation/native';

function ApplyNewDeductions({route, navigation}) {
  const isFocused = useIsFocused();
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [count, setCount] = useState(0);
  const [description, setDescription] = useState('');
  const [isInstalments, setIsInstalments] = useState(true);
  const [employeeArr, setEmployeeArr] = useState([]);
  const [employeeValue, setEmployeeValue] = useState('');
  const [openEmployee, setOpenEmployee] = useState(false);
  const [uploadDocument, setUploadDocument] = useState('');
  const [deductionTypeArr, setDeductionTypeArr] = useState([]);
  const [deductionTypeValue, setDeductionTypeValue] = useState('');
  const [openDeductionType, setOpenDeductionType] = useState(false);
  const [instalmentPeriodArr, setInstalmentPeriodArr] = useState([]);
  const [instalmentPeriodValue, setInstalmentPeriodValue] = useState('');
  const [openInstalmentPeriod, setOpenInstalmentPeriod] = useState(false);
  const [percentage, setPercentage] = useState('');
  const token = useSelector(state => state.session?.token);
  const uploadDoc = useSelector(state => state.uploadDocument?.document);
  const deductionData = useSelector(state => state.deduction?.deductionData);
  const userData = useSelector(state => state.employees);
  const applyNewDeductionsData = useSelector(state => state.applyNewDeductions);
  const isSpinner = useSelector(
    state => state.loading.effects.uploadDocument.setDocument,
  );
  const isNewDeductionLoading = useSelector(
    state => state.loading.effects.applyNewDeductions,
  );

  useEffect(() => {
    if (userData) {
      let arr = userData?.userData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].user_name, value: arr[i].id});
      }
      setEmployeeArr(dropDownArr);
    }
    if (deductionData) {
      let arr = deductionData;
      console.log(arr);
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].description, value: arr[i].id});
      }
      setDeductionTypeArr(dropDownArr);
    }
  }, [userData, deductionData]);

  useEffect(() => {
    dispatch.employees.get({token});
    dispatch.deduction.get({token});
  }, []);

  useEffect(() => {
    if (editData) {
      setDeductionTypeValue(editData?.deductTypeId);
      setUploadDocument(editData?.filePath);
      setIsInstalments(editData?.instalment);
      setInstalmentPeriodValue(editData?.instalmentPeriod);
      setPercentage(editData?.percentage?.toString());
      setEmployeeValue(editData?.userId);
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  const refresh = () => {
    setIsError(false);
    setIsInstalments(true);
    setDeductionTypeValue('');
    setEmployeeValue('');
    setPercentage('');
    setInstalmentPeriodValue('');
    setUploadDocument('');
  };

  useEffect(() => {
    dispatch.employees.get({token});
  }, []);

  useEffect(() => {
    if (
      applyNewDeductionsData.isAddApplyNewDeductions ||
      applyNewDeductionsData.isEditApplyNewDeductions
    ) {
      dispatch.applyNewDeductions.setApplyNewDeductions(false);
      dispatch.applyNewDeductions.saveEditApplyNewDeductions(false);
      cancelBtn();
    }
  }, [
    applyNewDeductionsData.isAddApplyNewDeductions ||
      applyNewDeductionsData.isEditApplyNewDeductions,
  ]);

  const onSaveBtnPress = () => {
    if (isInstalments && instalmentPeriodValue == '') {
      setIsError(true);
    } else if (
      employeeValue != '' &&
      deductionTypeValue != '' &&
      Validator.validateNumber(percentage) != '' &&
      uploadDocument != ''
    ) {
      setIsError(false);
      const data = {
        userId: employeeValue,
        deductTypeId: deductionTypeValue,
        percentage: parseFloat(percentage),
        instalment: isInstalments,
        instalmentPeriod: instalmentPeriodValue,
        filePath: uploadDoc?.url,
      };

      if (isEdit) {
        dispatch.applyNewDeductions.update({token, data, id: editData?.id});
      } else {
        dispatch.applyNewDeductions.add({token, data});
      }
    } else {
      setIsError(true);
    }
  };

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf, types.doc, types.csv],
      });
      const formData = new FormData();
      formData.append('document', response[0]);
      dispatch.uploadDocument.setDocument({token, formData});
      setUploadDocument(response[0].name);
      setCount(count + 1);
    } catch (err) {}
  };

  const removeBtnPress = () => {
    setUploadDocument('');
  };
  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Apply New Deduction'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={
            'Apply new deduction to employee to reflect on payslip. Fill in the respective fields.'
          }
        />

        <ApplyNewDeduction
          isError={isError}
          setDescription={setDescription}
          description={description}
          isInstalments={isInstalments}
          setIsInstalments={setIsInstalments}
          employeeArr={employeeArr}
          setEmployeeArr={setEmployeeArr}
          employeeValue={employeeValue}
          setEmployeeValue={setEmployeeValue}
          openEmployee={openEmployee}
          setOpenEmployee={setOpenEmployee}
          deductionTypeArr={deductionTypeArr}
          setDeductionTypeArr={setDeductionTypeArr}
          deductionTypeValue={deductionTypeValue}
          setDeductionTypeValue={setDeductionTypeValue}
          openDeductionType={openDeductionType}
          setOpenDeductionType={setOpenDeductionType}
          instalmentPeriodArr={instalmentPeriodArr}
          setInstalmentPeriodArr={setInstalmentPeriodArr}
          instalmentPeriodValue={instalmentPeriodValue}
          setInstalmentPeriodValue={setInstalmentPeriodValue}
          openInstalmentPeriod={openInstalmentPeriod}
          setOpenInstalmentPeriod={setOpenInstalmentPeriod}
          uploadDocument={uploadDocument}
          removeBtnPress={removeBtnPress}
          handleDocumentSelection={handleDocumentSelection}
          percentage={percentage}
          setPercentage={setPercentage}
          isSpinner={isSpinner}
          isView={isView}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : onSaveBtnPress}
          label={'Save'}
          isView={isView}
          saveLoading={
            isSpinner ||
            isNewDeductionLoading.add ||
            isNewDeductionLoading.update
          }
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ApplyNewDeductions;
