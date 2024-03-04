import React, {useEffect} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Leaves from './Leaves';
import Allowances from './Allowances';
import Header from '../../../component/Header';
import PropfileButton from '../../../component/PropfileButton';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';

const Entitlements = ({navigation}) => {
  const dispatch = useDispatch();
  const empDashboardData = useSelector(state => state.empDashboard);
  const token = useSelector(state => state.session?.token);
  const employeeProfile = useSelector(
    state => state.employeeProfile.personalInfo,
  );
  const user = useSelector(state => state.session?.user);

  useEffect(() => {
    dispatch.empDashboard.getEntitlesLeaveData({token});
    dispatch.empDashboard.getEntitlesAllownceData({token});
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    dispatch.employeeProfile.getPersonalInfo({
      token,
      id: user?.id,
    });
  };
  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={
          employeeProfile?.staff_personal_infos[0]?.firstName +
            ' ' +
            employeeProfile?.staff_personal_infos[0]?.lastName || ''
        }
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />

      <KeyboardAwareScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <View style={styles.userImageMainView}>
          <View style={styles.userImageView}>
            <Image
              source={
                employeeProfile?.staff_personal_infos[0]?.photo != null
                  ? {uri: employeeProfile?.staff_personal_infos[0]?.photo}
                  : require('../../../assets/placeholder.png')
              }
              style={styles.userImage}
            />
          </View>
        </View>

        <PropfileButton
          isEntitlements={true}
          documentBtnPress={() => {
            navigation.navigate('EmpDocuments');
          }}
          employmentDetails={() => {
            navigation.navigate('EmpEmploymentDetails');
          }}
          personalDeails={() => {
            navigation.navigate('EmpProfile');
          }}
        />

        <Leaves empDashboardData={empDashboardData?.entitlesLeaveData} />
        <Allowances
          empDashboardData={empDashboardData?.entitlesAllowncesData}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Entitlements;
