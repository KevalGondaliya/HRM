import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Summary from './Summary';
import TemplateHeader from './Header';
import Header from '../../../component/Header';
import AppraisalAnswers from './AppraisalAnswers';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

function AddPayslipTemplates({route, navigation}) {
  const isError = false;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const editData = route?.params?.data;
  const [dob, setDob] = useState('');
  const [icNumber, setICNumber] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [positions, setPositions] = useState('');
  const [department, setDepartment] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [selectDateType, setSelectDateType] = useState('');
  const [empAns, setEmpAns] = useState('');
  const [reviewAns, setReviewAns] = useState('');
  const [questionArr, setQuestionArr] = useState([]);
  const [score, setScore] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const token = useSelector(state => state.session?.token);
  const appraisalTemplatesData = useSelector(state => state.appraisalTemplates);
  const isAddAppraisalTemplatesLoading = useSelector(
    state => state.loading.effects.appraisalTemplates,
  );

  useEffect(() => {
    if (editData) {
      console.log(editData?.id);
      dispatch.appraisalTemplates.getQuestions({token, id: editData?.id});
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  const submitBtn = () => {
    let data = {status: 'Approve'};
    dispatch.appraisalTemplates.updatePending({token, data, id: editData?.id});
  };

  useEffect(() => {
    if (appraisalTemplatesData.isApprovePandingAppraisalData) {
      dispatch.appraisalTemplates.setApprovePandingAppraisalData(false);
      refresh();
      navigation.goBack();
    }
  }, [appraisalTemplatesData.isApprovePandingAppraisalData]);

  useEffect(() => {
    if (appraisalTemplatesData.questionData) {
      let data = appraisalTemplatesData?.questionData;
      setQuestionArr(data.aappraisalTeamQuizzes);
      setEmployeeName(data.empName);
      setEmployeeNumber(data.empNo?.toString());
      setDob(data.dob);
      setHireDate(data.hireDate);
      setOrganisation(data.organisationId);
      setDepartment(data.department?.department);
      setPositions(data.position?.position);
    }
  }, [appraisalTemplatesData.questionData]);

  const refresh = () => {
    setEmployeeName('');
    setEmployeeNumber('');
    setDob('');
    setHireDate('');
    setOrganisation('');
    setDepartment('');
    setPositions('');
  };

  const cancelBtn = () => {
    let data = {status: 'reject'};
    dispatch.appraisalTemplates.updatePending({token, data, id: editData?.id});
  };

  const dobBtnPress = () => {
    setDatePickerVisibility(true);
    setSelectDateType('dob');
  };

  const onHireDatePress = () => {
    setDatePickerVisibility(true);
    setSelectDateType('hireDate');
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={appraisalTemplatesData?.questionData?.empName}
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
          description1={'Review specific employee’s appraisals here.'}
          description2={'Fill in the respective fields.'}
        />

        <TemplateHeader
          dob={dob}
          isError={isError}
          hireDate={hireDate}
          icNumber={icNumber}
          positions={positions}
          department={department}
          employeeName={employeeName}
          organisation={organisation}
          employeeNumber={employeeNumber}
          selectDateType={selectDateType}
          isDatePickerVisible={isDatePickerVisible}
          setDob={setDob}
          setHireDate={setHireDate}
          setICNumber={setICNumber}
          setPositions={setPositions}
          setDepartment={setDepartment}
          setOrganisation={setOrganisation}
          setEmployeeName={setEmployeeName}
          setEmployeeNumber={setEmployeeNumber}
          setDatePickerVisibility={setDatePickerVisibility}
          onPress={dobBtnPress}
          onHireDatePress={onHireDatePress}
        />

        <AppraisalAnswers
          isError={isError}
          setEmpAns={setEmpAns}
          empAns={empAns}
          setReviewAns={setReviewAns}
          reviewAns={reviewAns}
          setScore={setScore}
          score={score}
          questionArr={questionArr}
        />

        <Summary />

        <SaveCancelBtn
          label={'Approve'}
          cancelLabel={'Reject'}
          cancelBtn={cancelBtn}
          submitBtn={submitBtn}
          saveLoading={isAddAppraisalTemplatesLoading.updatePending}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddPayslipTemplates;
