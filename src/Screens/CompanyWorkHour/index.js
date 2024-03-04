import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity, View, Text, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import WeekDay from './WeekDay';
import WeekDayTime from './WeekDayTime';
import {weekDay, weekDay1} from '../../utility/constant';
import Header from '../../component/Header';
import DropDowns from '../../component/DropDowns';
import SaveCancelBtn from '../../component/SaveCancelBtn';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';
import {scale} from 'react-native-size-matters';
import {useIsFocused} from '@react-navigation/native';

function CompanyWorkingHour({navigation, route}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isError, setIsError] = useState(false);
  const [type, setType] = useState('');
  const [count, setCount] = useState(0);
  const [selcectItem, setSelectItem] = useState('');
  const [cardDayArr, setCardDayArr] = useState(weekDay);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [organisationArr, setOrganisationArr] = useState([]);
  const [organisationValue, setOrganisationValue] = useState('');
  const organisationData = useSelector(state => state.organisations?.viewOrg);
  const token = useSelector(state => state.session?.token);
  const companyData = useSelector(state => state.company?.companyData);
  const user = useSelector(state => state.session?.user);
  const isWorkHours = useSelector(state => state.workHours?.isWorkHours);
  const workHourData = useSelector(state => state.workHours?.workHourData);
  const isLoading = useSelector(state => state.loading.effects.workHours.add);

  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
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
    if (isWorkHours) {
      dispatch.workHours.setWorkHours(false);
      cancelBrnPress();
    }
  }, [isWorkHours]);

  useEffect(() => {
    let workingDayArr = [];
    if (workHourData) {
      workingDayArr.push(JSON.parse(workHourData?.monday));
      workingDayArr.push(JSON.parse(workHourData?.tuesday));
      workingDayArr.push(JSON.parse(workHourData?.wednesday));
      workingDayArr.push(JSON.parse(workHourData?.thursday));
      workingDayArr.push(JSON.parse(workHourData?.friday));
      workingDayArr.push(JSON.parse(workHourData?.saturday));
      workingDayArr.push(JSON.parse(workHourData?.sunday));
      setCardDayArr([...workingDayArr]);
    } else {
      setCardDayArr([...weekDay]);
    }
  }, [workHourData]);

  useEffect(() => {
    dispatch.company.get({token});
    dispatch.workHours.get({token, id: companyData?.id});
  }, [isFocused]);

  const onUpdateBtnPress = () => {
    const validation = cardDayArr.every(
      item => item.time?.from && item.time?.to,
    );

    if (validation) {
      setIsError(false);
      let data = {
        monday: JSON.stringify(cardDayArr[0]),
        tuesday: JSON.stringify(cardDayArr[1]),
        wednesday: JSON.stringify(cardDayArr[2]),
        thursday: JSON.stringify(cardDayArr[3]),
        friday: JSON.stringify(cardDayArr[4]),
        saturday: JSON.stringify(cardDayArr[5]),
        sunday: JSON.stringify(cardDayArr[6]),
      };

      dispatch.workHours.add({token, data, id: companyData?.id});
    } else {
      setIsError(true);
    }
  };

  const cancelBrnPress = () => {
    setOrganisationValue('');
    setCardDayArr(weekDay1);
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Company’s Working Hours'}
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
          description1={'Set company’s working hours.'}
          description2={'This is just a default, employee’s working'}
          description3={'hours can be changed individually.'}
        />

        {/* <View style={styles.orgView}>
          <DropDowns
            data={organisationArr}
            placeholder="Select Organisations..."
            value={organisationValue}
            onChange={item => {
              setOrganisationValue(item.value);
            }}
            style={[isError && organisationValue == '' && styles.error]}
          />
        </View> */}

        <WeekDay />

        <WeekDayTime
          isError={isError}
          setIsError={setIsError}
          type={type}
          setType={setType}
          count={count}
          setCount={setCount}
          selcectItem={selcectItem}
          setSelectItem={setSelectItem}
          cardDayArr={cardDayArr}
          setCardDayArr={setCardDayArr}
          isDatePickerVisible={isDatePickerVisible}
          setDatePickerVisibility={setDatePickerVisibility}
        />

        <TouchableOpacity
          onPress={() => {
            onUpdateBtnPress();
          }}
          style={styles.saveBtnStyle}>
          {isLoading ? (
            <ActivityIndicator color={'#fff'} size={'small'} />
          ) : (
            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
              Update
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default CompanyWorkingHour;
