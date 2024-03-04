import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '../../../component/Header';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';
import Validator from '../../../utility/validator';
import Body from './Body';
import TemplateHeader from './Header';
import TemplateDetails from './TemplateDetails';

import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './style';

function AddAppraisalTemplates({route, navigation}) {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [dob, setDob] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [positions, setPositions] = useState('');
  const [department, setDepartment] = useState('');
  const [employeeArr, setEmployeeArr] = useState([]);
  const [organisation, setOrganisation] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [selectDateType, setSelectDateType] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfService, setNumberOfService] = useState('');
  const [positionArr, setPositionArr] = useState([]);
  const [departmentArr, setDepartmentArr] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [organisationArr, setOrganisationArr] = useState([]);
  const userData = useSelector(state => state.employees);
  const alertData = useSelector(state => state.alerts);

  const questionObj = {
    employee: '',
    reviewer: '',
    score: '',
  };
  const [questionArr, setQuestionArr] = useState([questionObj]);
  const token = useSelector(state => state.session?.token);
  const departmentData = useSelector(state => state.department?.getDepartment);
  // const organisationData = useSelector(state => state.organisations?.viewOrg);
  const relationValue = useSelector(state => state.relationValue);
  const appraisalTemplatesData = useSelector(state => state.appraisalTemplates);
  const isAddAppraisalTemplatesLoading = useSelector(
    state => state.loading.effects.appraisalTemplates,
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch.company.get({token});
    dispatch.employees.get({token});
    dispatch.department.department({token});
  };

  const onHireDatePress = () => {
    setDatePickerVisibility(true);
    setSelectDateType('hireDate');
  };

  const onDOBBtnPress = () => {
    setSelectDateType('dob');
    setDatePickerVisibility(true);
  };

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  const onChange = (key, item, index) => {
    let question = [...questionArr];
    if ([key] == 'score') {
      question[index] = {...question[index], [key]: parseFloat(item)};
    } else {
      question[index] = {...question[index], [key]: item};
    }
    setQuestionArr(question);
  };

  const addRuleBtnPress = () => {
    let arr = [...questionArr];
    arr.push(questionObj);
    setQuestionArr(arr);
  };

  useEffect(() => {
    if (departmentData?.length > 0) {
      let arr = departmentData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].department, value: arr[i].id});
      }
      setDepartmentArr(dropDownArr);
    }
  }, [departmentData]);

  useEffect(() => {
    // if (organisationData) {
    //   let arr = organisationData;
    //   let dropDownArr = [];
    //   for (let i = 0; i < arr.length; i++) {
    //     dropDownArr.push({label: arr[i].org_name, value: arr[i].id});
    //   }
    //   setOrganisationArr(dropDownArr);
    // }

    if (userData) {
      let arr = userData?.userData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].user_name, value: arr[i].id});
      }
      setEmployeeArr(dropDownArr);
    }
  }, [userData]);

  useEffect(() => {
    if (relationValue.positionValue) {
      let arr = relationValue.positionValue[0]?.positions;
      let orgArr = [];
      for (let i = 0; i < arr?.length; i++) {
        orgArr.push({label: arr[i].position, value: arr[i].id});
      }
      setPositionArr(orgArr);
    }
  }, [relationValue]);

  useEffect(() => {
    if (editData) {
      dispatch.appraisalTemplates.getQuestions({token, id: editData?.id});
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  useEffect(() => {
    if (
      appraisalTemplatesData.isAddAppraisalTemplates ||
      appraisalTemplatesData.isEditAppraisalTemplates
    ) {
      dispatch.appraisalTemplates.setAppraisalTemplates(false);
      dispatch.appraisalTemplates.saveEditAppraisalTemplates(false);
      cancelBtn();
    }
  }, [
    appraisalTemplatesData.isAddAppraisalTemplates ||
      appraisalTemplatesData.isEditAppraisalTemplates,
  ]);
  useEffect(() => {
    if (appraisalTemplatesData.questionData) {
      let data = appraisalTemplatesData?.questionData;
      console.log('*********', data);
      setQuestionArr(data.aappraisalTeamQuizzes);
      setTemplateName(data.appraisalTempName);
      setEmployeeName(data?.user?.userId);
      setEmployeeNumber(data.empNo?.toString());
      setDob(data.dob);
      setHireDate(data.hireDate);
      // setOrganisation(data.organisationId);
      setDescription(data.description); //
      setNumberOfService(data.numberOfYear); //
      setDepartment(data.department?.id);
      setPositions(data.position?.id);
      dispatch.relationValue.getDepartmentPosition({
        token,
        id: data.department?.id,
      });
    }
  }, [appraisalTemplatesData.questionData]);

  const submitBtn = () => {
    const validation = questionArr.every(
      item => item.employee && item.reviewer && item.score,
    );

    if (
      Validator.validateTextInput(templateName) != '' &&
      employeeName != '' &&
      Validator.validateNumber(employeeNumber) != '' &&
      Validator.validateNumber(numberOfService) != '' &&
      dob != '' &&
      hireDate != '' &&
      // organisation != '' &&
      department != '' &&
      positions != '' &&
      Validator.validateTextInput(description) != '' &&
      validation
    ) {
      setIsError(false);
      let data = {
        appraisalTempName: templateName,
        description: description,
        userId: employeeName,
        empNo: employeeNumber,
        dob: dob,
        hireDate: hireDate,
        numberOfYear: numberOfService,
        departmentId: department,
        positionId: positions,
        aappraisalTeamQuizzes: questionArr,
      };

      if (isEdit) {
        dispatch.appraisalTemplates.update({
          token,
          data,
          id: editData?.id,
        });
      } else {
        dispatch.appraisalTemplates.add({token, data});
      }
    } else {
      setIsError(true);
    }
  };

  const refresh = () => {
    setTemplateName('');
    setIsError(false);
    setEmployeeName('');
    setEmployeeNumber('');
    setDob('');
    setHireDate('');
    // setOrganisation('');
    setDepartment('');
    setPositions('');
    setDescription('');
    setNumberOfService('');
    setQuestionArr([questionObj]);
  };

  const onDelBtnPress = index => {
    const newData = questionArr;
    newData.splice(index, 1);
    setQuestionArr([...newData]);
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Appraisal Templates'}
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
          description1={'Add Appraisal templates within'}
          description2={'the company here. Fill in the respective fields.'}
        />

        <TemplateDetails
          isError={isError}
          isView={isView}
          templateName={templateName}
          setTemplateName={setTemplateName}
          setDescription={setDescription}
          description={description}
        />

        <TemplateHeader
          dob={dob}
          setDob={setDob}
          isError={isError}
          hireDate={hireDate}
          positions={positions}
          onPress={onDOBBtnPress}
          department={department}
          setHireDate={setHireDate}
          setPositions={setPositions}
          organisation={organisation}
          employeeName={employeeName}
          setDepartment={setDepartment}
          selectDateType={selectDateType}
          employeeNumber={employeeNumber}
          setOrganisation={setOrganisation}
          setEmployeeName={setEmployeeName}
          onHireDatePress={onHireDatePress}
          setEmployeeNumber={setEmployeeNumber}
          isDatePickerVisible={isDatePickerVisible}
          setDatePickerVisibility={setDatePickerVisibility}
          organisationArr={organisationArr}
          positionArr={positionArr}
          departmentArr={departmentArr}
          isView={isView}
          isEdit={isEdit}
          employeeArr={employeeArr}
          numberOfService={numberOfService}
          setNumberOfService={setNumberOfService}
        />

        <Body
          isEdit={isEdit}
          isView={isView}
          isError={isError}
          questionArr={questionArr}
          onChange={onChange}
          addRuleBtnPress={addRuleBtnPress}
          onDelBtnPress={onDelBtnPress}
        />

        <SaveCancelBtn
          label={isEdit ? 'Update' : 'Submit'}
          cancelBtn={cancelBtn}
          isEdit={isEdit}
          isView={isView}
          submitBtn={isView ? cancelBtn : submitBtn}
          style={styles.saveCancelBtnStyle}
          saveLoading={
            isAddAppraisalTemplatesLoading.add ||
            isAddAppraisalTemplatesLoading.update
          }
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddAppraisalTemplates;
