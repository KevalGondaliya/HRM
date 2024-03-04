import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {RefreshControl, TextInput, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../../component/Button';
import Header from '../../component/Header';
import ScreenDescription from '../../component/ScreenDescription';
import Colors from '../../theme';
import AddPositionsModal from './AddPositionsModal';
import Table from './Table';

import styles from './style';

function Positions({navigation}) {
  const dispatch = useDispatch();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [id, setEditId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [position, setPosition] = useState('');
  const [departmentValue, setDepartmentValue] = useState('');
  const [openDepartment, setOpenDepartment] = useState(false);
  const [departmentArr, setDepartmentArr] = useState([]);
  const [organisationTypeValue, setOrganisationTypeValue] = useState('');
  const [organisationTypeArr, setOrganisationTypeArr] = useState('');

  const isLoading = useSelector(state => state.loading.effects.position.add);
  const isEditLoading = useSelector(
    state => state.loading.effects.position.update,
  );
  const token = useSelector(state => state.session?.token);

  const editPosition = useSelector(state => state.position?.isEditPosition);
  const addPosition = useSelector(state => state.position?.isAddPosition);
  const positionData = useSelector(state => state.position?.positionData);
  // const organisationData = useSelector(state => state.organisations?.viewOrg);
  const departmentData = useSelector(state => state.department?.getDepartment);
  const relationValue = useSelector(state => state.relationValue);

  useEffect(() => {
    getPositionData();
  }, []);

  const getPositionData = () => {
    dispatch.position.get({token});
    dispatch.department.department({token});
    // dispatch.organisations.getOrganisations({token});
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
    if (relationValue.departmentValue) {
      let arr = relationValue?.departmentValue[0]?.departments;
      let dropDownArr = [];

      for (let i = 0; i < arr.length; i++) {
        dropDownArr.push({label: arr[i].department, value: arr[i].id});
      }
      setDepartmentArr(dropDownArr);
    }
  }, [relationValue]);

  const submitBtnPress = () => {
    if (departmentValue != '' && position != '') {
      const data = {
        // organisationId: organisationTypeValue,
        departmentId: departmentValue,
        position: position,
      };

      if (isEdit) {
        dispatch.position.update({token, data, id});
      } else {
        dispatch.position.add({token, data});
        setIsEdit(false);
      }

      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (addPosition || editPosition) {
      cancelBtnPress();
      getPositionData();
      dispatch.position.savePosition(false);
      dispatch.position.saveEditPosition(false);
    }
  }, [addPosition, editPosition]);

  const cancelBtnPress = () => {
    setIsModalVisible(false);
    setIsError(false);
    setIsView(false);
    setPosition('');
    setDepartmentValue('');
    setOrganisationTypeValue('');
  };

  const editIconPress = item => {
    setTimeout(
      function () {
        setIsEdit(true);
        setIsView(false);
        setIsModalVisible(true);
        setEditId(item.id);
        setDepartmentValue(item.departmentId);
        setPosition(item.position);
        setOrganisationTypeValue(item.organisationId);
      }.bind(this),
      500,
    );
  };

  const eyeIconPress = item => {
    setTimeout(
      function () {
        setIsModalVisible(true);
        setIsView(true);
        setDepartmentValue(item.departmentId);
        setPosition(item.position);
        setOrganisationTypeValue(item.organisationId);
      }.bind(this),
      500,
    );
  };

  const onDelBtnPree = item => {
    dispatch.position.delete({token, id: item.id});
  };

  const addPositionBtn = () => {
    setIsView(false);
    setIsModalVisible(true);
  };
  const searchData = e => {
    dispatch.position.get({token, e});
  };
  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Positions'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl onRefresh={getPositionData} refreshing={isLoading} />
        }
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <ScreenDescription
          description1={'Manage positions within'}
          description2={'the organisations here. Click on the respective'}
          description3={'button to edit or view the details'}
        />

        <View style={styles.searchBtnView}>
          <View style={styles.searchIconView}>
            <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
            <TextInput
              style={styles.searchInput}
              placeholder={'Search Query…'}
              placeholderTextColor={Colors.lightRed}
              onChangeText={e => debounce_fun(e)}
            />
          </View>

          <Button
            label={'Add Positions'}
            btnStyle={styles.cancelBtn}
            labelStyle={styles.addPosiTxt}
            onPress={addPositionBtn}
          />
        </View>

        <Table
          data={positionData}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          editIconPress={editIconPress}
          eyeIconPress={eyeIconPress}
          onDelBtnPree={onDelBtnPree}
          setpageCurrent={setpageCurrent}
        />

        <AddPositionsModal
          isModalVisible={isModalVisible}
          departmentValue={departmentValue}
          openDepartment={openDepartment}
          departmentArr={departmentArr}
          setOpenDepartment={setOpenDepartment}
          setDepartmentValue={setDepartmentValue}
          setDepartmentArr={setDepartmentArr}
          setPosition={setPosition}
          position={position}
          saveLoading={isLoading || isEditLoading}
          isError={isError}
          isView={isView}
          isEdit={isEdit}
          cancelBtnPress={cancelBtnPress}
          submitBtnPress={submitBtnPress}
          organisationTypeValue={organisationTypeValue}
          setOrganisationTypeValue={setOrganisationTypeValue}
          organisationTypeArr={organisationTypeArr}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Positions;
