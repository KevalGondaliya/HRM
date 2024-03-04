import {RefreshControl, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Table from './Table';
import Button from '../../component/Button';
import Header from '../../component/Header';
import AddDepartmentModal from './AddDepartmentModal';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';

function Department({navigation}) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setEditId] = useState('');
  const [isView, setIsView] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [departmentName, setDepartmentName] = useState('');
  const [departmentCode, setDepartmentCode] = useState('');
  const [organisationArr, setOrganisationArr] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [organisationValue, setOrganisationValue] = useState('');
  const [openOrganisation, setOpenOrganisation] = useState(false);
  const [isDataModalVisible, setIsDataModalVisible] = useState(false);

  const isLoading = useSelector(
    state => state.loading.effects.department.setDepartment,
  );
  console.log('looooadinggg', isLoading);
  const isEditLoading = useSelector(
    state => state.loading.effects.department.editDepartment,
  );
  const token = useSelector(state => state.session?.token);
  const department = useSelector(state => state.department?.addDepartment);

  const ediDepartment = useSelector(state => state.department?.editDepartment);
  const getDepartment = useSelector(state => state.department?.getDepartment);
  console.log(getDepartment);
  const organisationData = useSelector(state => state.organisations?.viewOrg);

  useEffect(() => {
    // dispatch.organisations.getOrganisations({token});
    getDepartmentData();
  }, []);

  const getDepartmentData = async () => {
    setIsModalVisible(false);
    setIsView(false);
    dispatch.department.department({token});
  };

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
    if (department?.status == 200) {
      cancelBtnPress();
      getDepartmentData();
      dispatch.department.saveDepartment(null);
    }
  }, [department]);

  const submitBtnPress = () => {
    if (departmentName != '' && departmentCode != '') {
      let data = {
        department: departmentName,
        departmentCode: departmentCode,
      };

      if (isEdit) {
        dispatch.department.editDepartment({token, data, id});
      } else {
        dispatch.department.setDepartment({token, data});
      }
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    cancelBtnPress();
  }, [ediDepartment]);

  const cancelBtnPress = () => {
    setOrganisationValue('');
    setDepartmentName('');
    setDepartmentCode('');
    setIsError(false);
    setIsEdit(false);
    setEditId('');
    setIsModalVisible(false);
  };

  const editIconPress = item => {
    setTimeout(
      function () {
        setIsEdit(true);
        setIsView(false);
        setIsModalVisible(true);
        setEditId(item.id);
        setOrganisationValue(item.organisationId);
        setDepartmentName(item.department);
        setDepartmentCode(item.departmentCode);
      }.bind(this),
      500,
    );
  };

  const eyeIconPress = item => {
    setTimeout(
      function () {
        setIsModalVisible(true);
        setIsView(true);
        setOrganisationValue(item.organisationId);
        setDepartmentName(item.department);
        setDepartmentCode(item.departmentCode);
      }.bind(this),
      500,
    );
  };

  const onDelBtnPree = item => {
    dispatch.department.deleteDepartment({token, id: item.id});
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Department'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getDepartmentData}
            refreshing={isLoading}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Manage organisations within'}
          description2={'the company here. Click on the respective'}
          description3={'button to edit or view the details'}
        />

        <View style={styles.searchBtnView}>
          <Button
            label={'View Positions'}
            btnStyle={[styles.cancelBtn, {paddingHorizontal: scale(35)}]}
            labelStyle={styles.btnLabelStyle}
            onPress={() => {
              navigation.navigate('ViewPosition');
            }}
          />

          <Button
            label={'Add Departments'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.btnLabelStyle}
            onPress={() => {
              setIsModalVisible(true);
            }}
          />
        </View>

        <Table
          data={getDepartment}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
          editIconPress={modalData => editIconPress(modalData)}
          eyeIconPress={modalData => eyeIconPress(modalData)}
          onDelBtnPree={modalData => onDelBtnPree(modalData)}
          isDataModalVisible={isDataModalVisible}
          setIsDataModalVisible={setIsDataModalVisible}
        />

        <AddDepartmentModal
          isModalVisible={isModalVisible}
          organisationValue={organisationValue}
          openOrganisation={openOrganisation}
          organisationArr={organisationArr}
          setOpenOrganisation={setOpenOrganisation}
          setOrganisationValue={setOrganisationValue}
          setOrganisationArr={setOrganisationArr}
          setDepartmentName={setDepartmentName}
          departmentName={departmentName}
          isError={isError}
          setDepartmentCode={setDepartmentCode}
          departmentCode={departmentCode}
          saveLoading={isLoading || isEditLoading}
          cancelBtnPress={cancelBtnPress}
          submitBtnPress={submitBtnPress}
          isView={isView}
          isEdit={isEdit}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Department;
