import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Rules from './Rules';
import Header from '../../../component/Header';
import ApprovalGroupDetails from './ApprovalGroupDetails';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import Validator from '../../../utility/validator';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

function AddAllowanceTypes({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [companyValue, setCompanyValue] = useState('');
  const [companyArr, setCompanyArr] = useState('');
  const [deleteIndex, setDeleteIndex] = useState('');
  const [isError, setIsError] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [organisationArr, setOrganisationArr] = useState([]);
  const [positionArr, setPositionArr] = useState([]);
  const [departmentArr, setDepartmentArr] = useState('');
  const companyData = useSelector(state => state.company?.companyData);
  const token = useSelector(state => state.session?.token);
  const positionData = useSelector(state => state.position.positionData);
  const allowanceTypesData = useSelector(state => state.allowanceTypes);
  const departmentData = useSelector(state => state.department?.getDepartment);
  const isAllowanceTypesLoading = useSelector(
    state => state.loading.effects.allowanceTypes,
  );
  const organisationData = useSelector(state => state.organisations?.viewOrg);

  const ruleObj = {
    // organisationId: '',
    departmentId: '',
    positionId: '',
    limitPeriod: '',
    limitAmt: '',
  };
  const [ruleAerr, setRuleArr] = useState([ruleObj]);
  const relationValue = useSelector(state => state.relationValue);

  useEffect(() => {
    if (positionData) {
      let arr = positionData;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({label: arr[i].position, value: arr[i].id});
      }
      setPositionArr(dropDownArr);
    }
  }, [positionData]);

  useEffect(() => {
    if (
      allowanceTypesData.isAddAllowanceTypes ||
      allowanceTypesData.isEditAllowanceTypes
    ) {
      dispatch.allowanceTypes.setAllowanceTypes(false);
      dispatch.allowanceTypes.saveEditAllowanceTypes(false);

      cancelBtn();
    }
  }, [
    allowanceTypesData.isAddAllowanceTypes ||
      allowanceTypesData.isEditAllowanceTypes,
  ]);

  useEffect(() => {
    if (allowanceTypesData.isDelRuleAllowanceTypes == true) {
      const newData = ruleAerr;
      newData.splice(deleteIndex, 1);
      setRuleArr([...newData]);
      dispatch.allowanceTypes.setDelRuleAllowanceTypes(false);
      setDeleteIndex('');
    }
  }, [allowanceTypesData.isDelRuleAllowanceTypes]);
  useEffect(() => {
    if (editData) {
      dispatch.allowanceTypes.getRule({
        token,
        id: editData?.id,
      });
    } else {
      refresh();
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
    dispatch.company.get({token});
    dispatch.position.get({token});
    dispatch.department.department({token});
    // dispatch.organisations.getOrganisations({token});
  }, []);

  useEffect(() => {
    if (allowanceTypesData.ruleData) {
      setGroupName(allowanceTypesData.ruleData?.description);
      setCompanyValue(allowanceTypesData.ruleData?.companyId);
      setRuleArr(allowanceTypesData.ruleData?.allowanceTypeRules);
    }
  }, [allowanceTypesData.ruleData]);

  const onSaveBtnPress = () => {
    const validation = ruleAerr.every(
      item => item.positionId && item.limitPeriod && item.limitAmt,
    );
    if (Validator.validateTextInput(groupName) != '' && validation) {
      setIsError(false);
      let data = {
        allowanceType: {
          description: groupName,
        },
        allowanceTypeRules: ruleAerr,
      };
      if (isEdit) {
        dispatch.allowanceTypes.update({token, data, id: editData?.id});
      } else {
        dispatch.allowanceTypes.add({token, data});
      }
    } else {
      setIsError(true);
    }
  };

  const onChange = (key, item, index) => {
    let rule = [...ruleAerr];
    if ([key] == 'limitAmt') {
      rule[index] = {...rule[index], [key]: item && parseFloat(item)};
    } else {
      if ([key] == 'departmentId') {
        rule[index] = {...rule[index], ['positionId']: ''};
      }
      rule[index] = {...rule[index], [key]: item.value};
    }
    setRuleArr(rule);
  };

  const addRuleBtnPress = () => {
    let arr = [...ruleAerr];
    arr.push(ruleObj);
    setRuleArr(arr);
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  const refresh = () => {
    setGroupName('');
    setCompanyValue('');
    setRuleArr([ruleObj]);
    setIsError(false);
  };

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  useEffect(() => {
    if (organisationData) {
      let arr = organisationData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].org_name, value: arr[i].id});
      }
      setOrganisationArr(dropDownArr);
    }
  }, [organisationData]);

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
    if (companyData) {
      let arr = companyData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].company_name, value: arr[i].id});
      }
      setCompanyArr(dropDownArr);
    }
  }, [companyData]);

  const onDelBtnPress = async (item, index) => {
    if (item?.id) {
      dispatch.allowanceTypes.deleteRule({token, id: item?.id});
    } else {
      dispatch.allowanceTypes.setDelRuleAllowanceTypes(true);
    }
    setDeleteIndex(index);
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Allowance Types'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={'Add allowance types within the'}
          description2={'company here. Fill in the respective fields.'}
        />

        <ApprovalGroupDetails
          isError={isError}
          setGroupName={setGroupName}
          groupName={groupName}
          companyData={companyArr}
          companyValue={companyValue}
          setCompanyValue={setCompanyValue}
          isEdit={isEdit}
          isView={isView}
        />

        <Rules
          isEdit={isEdit}
          isView={isView}
          isError={isError}
          setIsError={setIsError}
          ruleAerr={ruleAerr}
          onChange={onChange}
          addRuleBtnPress={addRuleBtnPress}
          positionArr={positionArr}
          organisationArr={organisationArr}
          departmentArr={departmentArr}
          onDelBtnPress={onDelBtnPress}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : onSaveBtnPress}
          saveLoading={
            isAllowanceTypesLoading.add || isAllowanceTypesLoading.update
          }
          isEdit={isEdit}
          isView={isView}
          label={isEdit ? 'Update' : 'Submit'}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddAllowanceTypes;
