import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DocumentPicker, {types} from 'react-native-document-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../../component/Header';
import {dropDownData} from '../../../dummyData';
import ApprovalGroupDetails from './ApprovalGroupDetails';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import Validator from '../../../utility/validator';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

function AddELearningModules({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [isError, setIsError] = useState(false);
  const [openPeriod, setOpenPeriod] = useState('');
  const [description, setdescription] = useState('');
  const [periodValue, setPeriodValue] = useState(false);
  const [periodArr, setPeriodArr] = useState(dropDownData);
  const [uploadDocument, setUploadDocument] = useState('');
  const [positionsValue, setPositionsValue] = useState('');
  const [openPositions, setOpenPositions] = useState(false);
  const [departmentValue, setDepartmentValue] = useState('');
  const [openDepartment, setOpenDepartment] = useState(false);
  const [departmentArr, setDepartmentArr] = useState([]);
  const [positionsArr, setPositionsArr] = useState([]);
  const [organisationArr, setOrganisationArr] = useState([]);
  const [organisationId, setOrganisationId] = useState('');
  const [eLearningTypeValue, setELearningTypeValue] = useState('');
  const isLoading = useSelector(state => state.loading.effects.elearning.add);
  const isEditLoading = useSelector(
    state => state.loading.effects.elearning.update,
  );
  const token = useSelector(state => state.session?.token);
  const uploadDoc = useSelector(state => state.uploadDocument?.document);

  const isElearningData = useSelector(state => state.elearning?.isAddElearning);
  const isEditElearning = useSelector(
    state => state.elearning?.isEditElearning,
  );
  const departmentData = useSelector(state => state.department?.getDepartment);

  const relationValue = useSelector(state => state.relationValue);

  useEffect(() => {
    dispatch.department.department({token});
  }, []);
  useEffect(() => {
    if (editData) {
      setdescription(editData?.modDesc);
      setDepartmentValue(editData?.department?.id);
      setPositionsValue(editData?.position?.id);
      setTitle(editData?.elearnModTitle);
      setUploadDocument(editData?.filePath);
      setPeriodValue(editData?.period);
      setOrganisationId(editData?.organisationId);
      setELearningTypeValue(editData?.eType);
    } else {
      onRefresh();
    }
  }, [editData, isFocused]);

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
    if (isElearningData || isEditElearning) {
      cancelBtn();
    }
  }, [isElearningData, isEditElearning]);

  useEffect(() => {
    if (relationValue.positionValue) {
      let arr = relationValue.positionValue[0]?.positions;
      let orgArr = [];
      for (let i = 0; i < arr.length; i++) {
        orgArr.push({label: arr[i].position, value: arr[i].id});
      }
      setPositionsArr(orgArr);
    }
  }, [relationValue]);

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

  const cancelBtn = () => {
    onRefresh();
    navigation.navigate('ELearningModules');
  };

  const onRefresh = () => {
    setTitle('');
    setdescription('');
    setPeriodValue('');
    setPositionsValue('');
    setUploadDocument('');
    setDepartmentValue('');
    setOrganisationId('');
    setELearningTypeValue('');
    dispatch.elearning.saveElearning(false);
    dispatch.elearning.saveEditElearning(false);
  };

  const submitBtn = () => {
    if (
      Validator.validateTextInput(title) != '' &&
      departmentValue != '' &&
      positionsValue != '' &&
      Validator.validateTextInput(description) != '' &&
      uploadDocument != '' &&
      periodValue != '' &&
      eLearningTypeValue != ''
    ) {
      let id = editData?.id;
      const data = {
        elearnModTitle: title,
        filePath: uploadDoc ? uploadDoc.url : uploadDocument,
        departmentId: departmentValue,
        modDesc: description,
        period: periodValue,
        positionId: positionsValue,
        eType: eLearningTypeValue,
      };

      isEdit
        ? dispatch.elearning.update({token, data, id})
        : dispatch.elearning.add({token, data});
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add E-Learning Modules'}
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
          description1={'Add e-learning modules within the'}
          description2={'company here. Fill in the respective fields.'}
        />

        <ApprovalGroupDetails
          title={title}
          isView={isView}
          isError={isError}
          setTitle={setTitle}
          periodArr={periodArr}
          openPeriod={openPeriod}
          periodValue={periodValue}
          description={description}
          setPeriodArr={setPeriodArr}
          positionsArr={positionsArr}
          departmentArr={departmentArr}
          setOpenPeriod={setOpenPeriod}
          openPositions={openPositions}
          openDepartment={openDepartment}
          setDescription={setdescription}
          setPeriodValue={setPeriodValue}
          positionsValue={positionsValue}
          uploadDocument={uploadDocument}
          removeBtnPress={removeBtnPress}
          departmentValue={departmentValue}
          setPositionsArr={setPositionsArr}
          setDepartmentArr={setDepartmentArr}
          setOpenPositions={setOpenPositions}
          setPositionsValue={setPositionsValue}
          setOpenDepartment={setOpenDepartment}
          setDepartmentValue={setDepartmentValue}
          handleDocumentSelection={handleDocumentSelection}
          organisationArr={organisationArr}
          organisationId={organisationId}
          setOrganisationId={setOrganisationId}
          eLearningTypeValue={eLearningTypeValue}
          setELearningTypeValue={setELearningTypeValue}
        />

        <SaveCancelBtn
          // label={'Next'}
          label={isEdit ? 'Update' : 'Submit'}
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : submitBtn}
          saveLoading={isLoading || isEditLoading}
          isView={isView}
          isEdit={isEdit}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddELearningModules;
