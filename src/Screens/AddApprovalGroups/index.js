import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Rules from './Rules';
import Header from '../../component/Header';
import {categoryDataArr} from '../../utility/constant';
import ApprovalGroupDetails from './ApprovalGroupDetails';
import SaveCancelBtn from '../../component/SaveCancelBtn';
import Validator from '../../utility/validator';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';

function AddApprovalGroups({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [isError, setIsError] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [empValue, setEmpValue] = useState('');
  const [employeeArr, setEmployeeArr] = useState([]);
  const [orgValue, setOrgValue] = useState('');
  const [organisationArr, setOrganisationArr] = useState([]);
  const [approversArr, setApproversArr] = useState([]);
  const [categoryArr, setCategoryArr] = useState(categoryDataArr);
  const ruleObj = {
    approverType: '',
    userId: '',
    category: '',
    specificType: '',
  };
  const [ruleAerr, setRuleArr] = useState([ruleObj]);
  const token = useSelector(state => state.session?.token);
  const approvalGroups = useSelector(state => state.approvalGroups);
  const organisationData = useSelector(state => state.organisations?.viewOrg);
  const approvalGroupsData = useSelector(state => state.approvalGroups);
  const isLoading = useSelector(state => state.loading.effects.approvalGroups);
  const userData = useSelector(state => state.employees);
  const [deleteIndex, setDeleteIndex] = useState('');

  useEffect(() => {
    if (editData) {
      dispatch.approvalGroups.getRule({
        token,
        id: editData?.id,
      });
    } else {
      refresh();
      getApprovalData();
    }
  }, [editData, isFocused]);

  useEffect(() => {
    // dispatch.organisations.getOrganisations({token});
    getApprovalData();
  }, []);

  const getApprovalData = () => {
    dispatch.employees.getRmsUser({token});
    dispatch.employees.get({token});
  };

  useEffect(() => {
    if (userData?.rmData) {
      let arr = userData?.rmData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].user_name, value: arr[i].id});
      }
      setApproversArr(dropDownArr);
    }
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
    if (approvalGroupsData.ruleData) {
      setGroupName(approvalGroupsData.ruleData?.approvalGroupName);
      setEmpValue(approvalGroupsData.ruleData?.userId);
      setRuleArr(approvalGroupsData.ruleData?.approvalGroupsRules);
    }
  }, [approvalGroupsData.ruleData]);

  useEffect(() => {
    if (organisationData) {
      let arr = organisationData;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({label: arr[i].org_name, value: arr[i].id});
      }
      setOrganisationArr(dropDownArr);
    }
  }, [organisationData]);

  useEffect(() => {
    if (
      approvalGroups.isAddApprovalGroups ||
      approvalGroups.isEditApprovalGroups
    ) {
      dispatch.approvalGroups.setApprovalGroups(false);
      dispatch.approvalGroups.saveEditApprovalGroups(false);
      cancelBtn();
    }
  }, [
    approvalGroups.isAddApprovalGroups || approvalGroups.isEditApprovalGroups,
  ]);

  useEffect(() => {
    if (approvalGroups.isApprovalGroups == true) {
      const newData = ruleAerr;
      newData.splice(deleteIndex, 1);
      setRuleArr([...newData]);
      dispatch.approvalGroups.setDelApprovalGroups(false);
      setDeleteIndex('');
    }
  }, [approvalGroups.isApprovalGroups]);

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  const refresh = () => {
    setEmpValue('');
    setOrgValue('');
    setGroupName('');
    setRuleArr([ruleObj]);
  };

  const onChange = (key, item, index) => {
    let rule = [...ruleAerr];
    rule[index] = {...rule[index], [key]: item.value};
    setRuleArr(rule);
  };

  const addRuleBtnPress = () => {
    let arr = [...ruleAerr];
    arr.push(ruleObj);
    setRuleArr(arr);
  };

  const submitBtn = () => {
    const validation = ruleAerr.every(
      item =>
        item.approverType && item.userId && item.category && item.specificType,
    );
    if (
      Validator.validateTextInput(groupName) != '' &&
      empValue != '' &&
      validation
    ) {
      setIsError(false);
      let data = {
        groupDetail: {
          approvalGroupName: groupName,
          userId: empValue,
        },

        rules: ruleAerr,
      };

      if (isEdit) {
        dispatch.approvalGroups.update({
          token,
          data,
          id: approvalGroupsData.ruleData?.id,
        });
      } else {
        dispatch.approvalGroups.add({token, data});
      }
    } else {
      setIsError(true);
    }
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  // const onDelBtnPress = index => {
  //   const newData = ruleAerr;
  //   newData.splice(index, 1);
  //   setRuleArr([...newData]);
  // };

  const onDelBtnPress = async (item, index) => {
    if (item?.id) {
      dispatch.approvalGroups.deleteRules({token, id: item?.id});
    } else {
      dispatch.approvalGroups.setDelApprovalGroups(true);
    }
    setDeleteIndex(index);
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Approval Groups'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={'Add approval groups within'}
          description2={'the company here. Fill in the respective fields.'}
        />

        <ApprovalGroupDetails
          isView={isView}
          isError={isError}
          setGroupName={setGroupName}
          organisationData={organisationArr}
          orgValue={orgValue}
          setOrgValue={setOrgValue}
          groupName={groupName}
          empValue={empValue}
          empArr={employeeArr}
          setEmpValue={setEmpValue}
        />

        <Rules
          isEdit={isEdit}
          isView={isView}
          isError={isError}
          ruleAerr={ruleAerr}
          onChange={onChange}
          addRuleBtnPress={addRuleBtnPress}
          categoryArr={categoryArr}
          approversArr={approversArr}
          onDelBtnPress={onDelBtnPress}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : submitBtn}
          saveLoading={isLoading.add || isLoading.update}
          isView={isView}
          isEdit={isEdit}
          label={isEdit ? 'Update' : 'Submit'}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddApprovalGroups;
