import React, { useEffect } from 'react';
import {
  PermissionsAndroid,
  Platform,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

import CourseData from './CourseData';
import EntitledLeaves from './EntitledLeaves';
import Header from '../../../component/Header';
import PendingAppraisals from './PendingAppraisals';
import PendingApplications from './PendingApplications';

import style from './style';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const empDashboardData = useSelector(state => state.empDashboard);
  const isEmpDashboardLoading = useSelector(
    state => state.loading.effects.empDashboard,
  );
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);

  const elearning = useSelector(
    state => state.elearning?.elearnProgressDataById,
  );

  useEffect(async () => {
    getEmpDashbordData();
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This App needs access to your location ' +
            'so we can know where you are.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use locations ');
      } else {
        getPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const getEmpDashbordData = () => {
    dispatch.empDashboard.getPendingApplicationData({ token });
    dispatch.company.get({ token });
    dispatch.empDashboard.getEntitlesLeaveData({ token });
    dispatch.elearning.getProgressDataById({ token, id: user?.id });
  };

  const getPermission = () => {
    if (Platform.OS == 'android') {
      Geolocation.getCurrentPosition(
        position => {
          const NY = {
            lat: position.latitude,
            lng: position.longitude,
          };
          Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(json => {
              var add = json.results[0].formatted_address;
              var value = add.split(',');
              let count = value.length;
              let city = value[count - 3];
              console.log('city---------------------', city);
              dispatch.user.setUserLocation(city);
              dispatch.user.setUserLatLong(NY);
            })
            .catch(error => console.warn(error));
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } else if (Platform.OS === 'ios') {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 300000,
      })
        .then(location => {
          console.log('locations----------------', location);
          const NY = {
            lat: location.latitude,
            lng: location.longitude,
          };
          Geocoder.from(location?.latitude, location?.longitude).then(json => {
            var add = json.results[0].formatted_address;
            var value = add.split(',');
            let count = value.length;
            let city = value[count - 3];
            console.log(city);
            dispatch.user.setUserLocation(city);
            dispatch.user.setUserLatLong(NY);
          });
          // setIsLoading(false);
        })
        .catch(ex => {
          const { code, message } = ex;
          console.warn(code, message);
          if (code === 'CANCELLED') {
            // Alert.alert('Location cancelled by user or by another request');
          }
          if (code === 'UNAVAILABLE') {
            Alert.alert('Location service is disabled or unavailable');
          }
          if (code === 'TIMEOUT') {
            Alert.alert('Location request timed out');
          }
          if (code === 'UNAUTHORIZED') {
            Alert.alert(
              'LOCATION DISABLED',
              'This screen requires your location to display nearby safety alerts and advice. To access safety information without location services, please select Travel at the bottom of the screen and create a new trip.',
              [
                {
                  text: 'Ok',
                  // onPress: () => Alert.alert('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Settings',
                  onPress: () => Linking.openSettings(),
                },
              ],
            );
          }
        });
    }
  };
  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'Dashboard'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getEmpDashbordData}
            refreshing={isEmpDashboardLoading.getPendingApplicationData}
          />
        }
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={style.keyboardAwareScrollView}>

        <PendingApplications pendingData={empDashboardData?.leavesReportData} />
        <EntitledLeaves pendingData={empDashboardData?.entitlesLeaveData} />

        <CourseData courseData={elearning} />

        <PendingAppraisals
          onPress={() => {
            navigation.navigate('EmpAppraisal');
          }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
