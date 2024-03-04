import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../../../component/Header';
import SaveCancelBtn from '../../../../component/SaveCancelBtn';
import ScreenDescription from '../../../../component/ScreenDescription';
import {booleanData} from '../../../../dummyData';
import AppraisalCycleDetails from './AppraisalCycleDetails';

import {useIsFocused} from '@react-navigation/native';
import styles from './style';

function AddAppraisalTemplates({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [name, setName] = useState('');
  const [cycleName, setCycleName] = useState('');
  const [isError, setIsError] = useState(false);
  const [template, setTemplate] = useState('');
  const [dateType, setDateType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [empEndDate, setEmpEndDate] = useState('');
  const [employee, setEmployee] = useState('');
  const [employeeArr, setEmployeeArr] = useState('');
  const [flowTypeValue, setFlowTypeValue] = useState('');
  const [templateTypeArr, setTemplateTypeArr] = useState([]);
  const [openFlowType, setOpenFlowType] = useState(false);
  const [flowTypeArr, setFlowTypeArr] = useState(booleanData);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const addAppraisalCycles = useSelector(state => state.addAppraisalCycles);
  const userData = useSelector(state => state.employees);
  const token = useSelector(state => state.session?.token);
  const isAddAppraisalCyclesLoading = useSelector(
    state => state.loading.effects.addAppraisalCycles,
  );
  const appraisalTemplatesData = useSelector(state => state.appraisalTemplates);

  useEffect(() => {
    dispatch.employees.get({token});
    dispatch.appraisalTemplates.get({token});
  }, []);

  useEffect(() => {
    if (userData) {
      let arr = userData?.userData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].user_name, value: arr[i].id});
      }
      setEmployeeArr(dropDownArr);
    }
    if (appraisalTemplatesData) {
      let arr = appraisalTemplatesData?.appraisalTemplatesData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].appraisalTempName, value: arr[i].id});
      }
      setTemplateTypeArr(dropDownArr);
    }
  }, [userData, appraisalTemplatesData]);

  useEffect(() => {
    if (editData) {
      console.log('---------', editData?.flowType);
      setTemplate(editData?.appraisalTemplateId);
      setEmployee(editData?.userId);
      setStartDate(editData?.appraisalStartDate);
      setEndDate(editData?.appraisalEndDate);
      setEmpEndDate(editData?.empEndDate);
      setFlowTypeValue(editData?.flowType);
      setCycleName(editData?.cycleName);
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  useEffect(() => {
    if (
      addAppraisalCycles.isAddAddAppraisalCycles ||
      addAppraisalCycles.isEditAddAppraisalCycles
    ) {
      dispatch.addAppraisalCycles.setAddAppraisalCycles(false);
      dispatch.addAppraisalCycles.saveEditAddAppraisalCycles(false);
      cancelBtn();
    }
  }, [
    addAppraisalCycles.isAddAddAppraisalCycles ||
      addAppraisalCycles.isEditAddAppraisalCycles,
  ]);

  const handleConfirm = date => {
    switch (dateType) {
      case 'startDate':
        setStartDate(date);
        setDatePickerVisibility(false);
        break;

      case 'endDate':
        setEndDate(date);
        setDatePickerVisibility(false);
        break;
      case 'empEndDate':
        setEmpEndDate(date);
        setDatePickerVisibility(false);
        break;
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onStartDateBtnPress = () => {
    setDateType('startDate');
    setDatePickerVisibility(true);
  };

  const onEndDateBtnPress = () => {
    setDateType('endDate');
    setDatePickerVisibility(true);
  };

  const onEmpEndDateBtnPress = () => {
    setDateType('empEndDate');
    setDatePickerVisibility(true);
  };

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  const refresh = () => {
    setIsError(false);
    setName('');
    setTemplate('');
    setEmployee('');
    setStartDate('');
    setEndDate('');
    setEmpEndDate('');
    setFlowTypeValue('');
    setCycleName('');
  };

  const submitBtn = () => {
    if (
      template &&
      // employee &&
      flowTypeValue &&
      startDate &&
      endDate &&
      empEndDate &&
      cycleName
    ) {
      setIsError(false);
      let data = {
        flowType: flowTypeValue,
        // userId: employee,
        appraisalStartDate: startDate,
        appraisalEndDate: endDate,
        empEndDate: empEndDate,
        appraisalTemplateId: template,
        cycleName: cycleName,
      };

      isEdit
        ? dispatch.addAppraisalCycles.update({
            token,
            data,
            id: editData?.id,
          })
        : dispatch.addAppraisalCycles.add({token, data});
    } else {
      setIsError(true);
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Appraisal Cycles'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Add appraisal cycles within the'}
          description2={'company here. Fill in the respective fields.'}
        />

        <AppraisalCycleDetails
          name={name}
          isError={isError}
          setName={setName}
          template={template}
          setTemplate={setTemplate}
          flowTypeArr={flowTypeArr}
          openFlowType={openFlowType}
          flowTypeValue={flowTypeValue}
          setFlowTypeArr={setFlowTypeArr}
          setOpenFlowType={setOpenFlowType}
          setFlowTypeValue={setFlowTypeValue}
          startDate={startDate}
          endDate={endDate}
          empEndDate={empEndDate}
          onStartDateBtnPress={onStartDateBtnPress}
          onEndDateBtnPress={onEndDateBtnPress}
          onEmpEndDateBtnPress={onEmpEndDateBtnPress}
          employee={employee}
          setEmployee={setEmployee}
          employeeArr={employeeArr}
          isView={isView}
          templateTypeArr={templateTypeArr}
          cycleName={cycleName}
          setCycleName={setCycleName}
        />

        <SaveCancelBtn
          label={isEdit ? 'Update' : 'Submit'}
          style={styles.saveCancelBtnStyle}
          cancelBtn={cancelBtn}
          isView={isView}
          isEdit={isEdit}
          submitBtn={isView ? cancelBtn : submitBtn}
          saveLoading={
            isAddAppraisalCyclesLoading.add ||
            isAddAppraisalCyclesLoading.update
          }
        />
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
}

export default AddAppraisalTemplates;
