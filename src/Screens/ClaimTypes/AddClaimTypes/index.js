import moment from 'moment';
import {View, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ClaimTypes from './ClaimTypes';
import Header from '../../../component/Header';
import Validator from '../../../utility/validator';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import {
  claimTypeCatagoryDataArr,
  claimTypeDataArr,
} from '../../../utility/constant';

const AddClaimTypes = ({route, navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [isError, setIsError] = useState(false);
  const [claimDesValue, setClaimDesValue] = useState('');
  const [limitPeriod, setLimitPeriod] = useState('');
  const [claimLimit, setClaimLimit] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const categoryObj = {claimType: ''};
  const [categoryNameArr, setCategoryNameArr] = useState([categoryObj]);
  const [isNewEmployess, setIsNewEmployess] = useState(true);
  const [isReciptRequired, setIsReciptRequired] = useState(true);
  const [positionArr, setPositionArr] = useState([]);
  const [departmentArr, setDepartmentArr] = useState('');
  const [positionValue, setPositionValue] = useState('');
  const [departmentValue, setDepartmentValue] = useState('');
  const [applyLimitToValue, setApplyLimitToValue] = useState('');
  // const [categArr, setCategArr] = useState([categoryObj]);
  const categoryDataArr = claimTypeCatagoryDataArr;
  const claimTypesDataArr = claimTypeDataArr;
  const token = useSelector(state => state.session?.token);
  const claimTypes = useSelector(state => state.claimTypes);
  const departmentData = useSelector(state => state.department?.getDepartment);
  const relationValue = useSelector(state => state.relationValue);
  const [deleteIndex, setDeleteIndex] = useState('');
  const isClaimTypesLoading = useSelector(
    state => state.loading.effects.claimTypes,
  );

  useEffect(() => {
    dispatch.department.department({token});
  }, []);

  useEffect(() => {
    if (departmentData?.length > 0) {
      let arr = departmentData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].department, value: arr[i].id});
      }
      setDepartmentArr(dropDownArr);
    }

    if (relationValue.positionValue) {
      let arr = relationValue.positionValue[0]?.positions;
      let orgArr = [];
      for (let i = 0; i < arr?.length; i++) {
        orgArr.push({label: arr[i].position, value: arr[i].id});
      }
      setPositionArr(orgArr);
    }
  }, [departmentData, relationValue]);

  useEffect(() => {
    if (editData) {
      dispatch.claimTypes.getClaimTypeCategory({
        token,
        id: editData?.id,
      });
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  useEffect(() => {
    if (claimTypes.claimTypeCategoryData) {
      setPositionValue(claimTypes.claimTypeCategoryData[0]?.positionId);
      dispatch.relationValue.getDepartmentPosition({
        token,
        id: claimTypes.claimTypeCategoryData[0]?.departmentId,
      });
      setDepartmentValue(claimTypes.claimTypeCategoryData[0]?.departmentId);
      setApplyLimitToValue(claimTypes.claimTypeCategoryData[0]?.applyLimitTo);
      setIsNewEmployess(
        claimTypes.claimTypeCategoryData[0]?.newEmpEntitledClaim,
      );
      setIsReciptRequired(claimTypes.claimTypeCategoryData[0]?.recieptReq);
      setClaimDesValue(claimTypes.claimTypeCategoryData[0]?.description);
      setLimitPeriod(claimTypes.claimTypeCategoryData[0]?.limit_period);
      setClaimLimit(claimTypes.claimTypeCategoryData[0]?.limit_amount);
      setCategoryNameArr(claimTypes.claimTypeCategoryData[0]?.categoryArrays);
    }
  }, [claimTypes.claimTypeCategoryData]);

  useEffect(() => {
    if (claimTypes.isAddClaimTypes || claimTypes.isEditClaimTypes) {
      dispatch.claimTypes.setAddClaimTypes(false);
      dispatch.claimTypes.setEditClaimTypes(false);
      cancelBtn();
    }
  }, [claimTypes.isAddClaimTypes || claimTypes.isEditClaimTypes]);
  useEffect(() => {
    if (claimTypes.isDelCatClaimTypes == true) {
      const newData = categoryNameArr;
      newData.splice(deleteIndex, 1);
      setCategoryNameArr([...newData]);
      dispatch.claimTypes.setDelCatClaimTypes(false);
      setDeleteIndex('');
    }
  }, [claimTypes.isDelCatClaimTypes]);

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  const refresh = () => {
    setIsError(false);
    setClaimLimit('');
    setCategoryNameArr([categoryObj]);
    setClaimDesValue('');
    setLimitPeriod('');
    setPositionValue('');
    setDepartmentValue('');
    setApplyLimitToValue('');
    setIsNewEmployess(true);
    setIsReciptRequired(true);
  };

  const submitBtn = () => {
    const validation = categoryNameArr.every(item => item.claimType);
    if (
      Validator.validateTextInput(claimDesValue) != '' &&
      limitPeriod != '' &&
      claimLimit != '' &&
      applyLimitToValue != '' &&
      validation
    ) {
      setIsError(false);
      let data = {
        description: claimDesValue,
        limit_period: limitPeriod,
        limit_amount: claimLimit,
        categoryId: categoryNameArr,
        applyLimitTo: applyLimitToValue,
        departmentId: departmentValue || null,
        positionId: positionValue || null,
        newEmpEntitledClaim: isNewEmployess,
        recieptReq: isReciptRequired,
      };

      if (isEdit) {
        dispatch.claimTypes.update({
          token,
          data,
          id: editData?.id,
        });
      } else {
        dispatch.claimTypes.add({token, data});
      }
    } else {
      setIsError(true);
    }
  };

  const onChange = (key, item, index) => {
    let rule = [...categoryNameArr];
    rule[index] = {...rule[index], [key]: item.value};
    setCategoryNameArr(rule);
  };

  const addCategoryBtnPress = () => {
    let arr = [...categoryNameArr];
    arr.push(categoryObj);
    setCategoryNameArr(arr);
  };

  const handleConfirm = date => {
    setLimitPeriod(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onDateBtnPress = () => {
    setDatePickerVisibility(true);
  };

  // const onDelBtnPress = index => {
  //   const newData = categoryNameArr;
  //   newData.splice(index, 1);
  //   setCategArr([...newData]);
  // };
  const onDelBtnPress = async (item, index) => {
    if (item?.id) {
      dispatch.claimTypes.deleteCategory({token, id: item?.id});
    } else {
      dispatch.claimTypes.setDelCatClaimTypes(true);
    }
    setDeleteIndex(index);
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        // label={'Add Claim Types'}
        label={
          isEdit ? (
            <Text> Edit Claim Types</Text>
          ) : (
            <Text> Add Claim Types</Text>
          )
        }
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'Add claim types within the company'}
          description2={'here. Fill in the respective fields.'}
        />
        <View style={{paddingHorizontal: scale(8)}}>
          <ClaimTypes
            isView={isView}
            isEdit={isEdit}
            isError={isError}
            claimDesValue={claimDesValue}
            setClaimDesValue={setClaimDesValue}
            claimLimit={claimLimit}
            setClaimLimit={setClaimLimit}
            setLimitPeriod={setLimitPeriod}
            limitPeriod={limitPeriod}
            categoryNameArr={categoryNameArr}
            onChange={onChange}
            categoryDataArr={categoryDataArr}
            addCategoryBtnPress={addCategoryBtnPress}
            onPress={onDateBtnPress}
            claimTypesDataArr={claimTypesDataArr}
            applyLimitToValue={applyLimitToValue}
            setApplyLimitToValue={setApplyLimitToValue}
            departmentValue={departmentValue}
            departmentArr={departmentArr}
            setDepartmentValue={setDepartmentValue}
            positionArr={positionArr}
            positionValue={positionValue}
            setPositionValue={setPositionValue}
            isNewEmployess={isNewEmployess}
            setIsNewEmployess={setIsNewEmployess}
            setIsReciptRequired={setIsReciptRequired}
            isReciptRequired={isReciptRequired}
            onDelBtnPress={onDelBtnPress}
          />

          <SaveCancelBtn
            cancelBtn={cancelBtn}
            submitBtn={isView ? cancelBtn : submitBtn}
            isEdit={isEdit}
            isView={isView}
            saveLoading={isClaimTypesLoading.add || isClaimTypesLoading.update}
            label={isEdit ? 'Update' : 'Submit'}
          />
        </View>
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        mode="date"
        onCancel={hideDatePicker}
        onConfirm={handleConfirm}
        isVisible={isDatePickerVisible}
      />
    </SafeAreaView>
  );
};

export default AddClaimTypes;
