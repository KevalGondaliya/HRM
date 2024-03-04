/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable*/
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {launchCamera} from 'react-native-image-picker';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  SafeAreaView,
  View,
} from 'react-native';
import {RNCamera, FaceDetector} from 'react-native-camera';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import Table from './Table';
import Header from '../../../component/Header';
import Button from '../../../component/Button';
import ScreenDescription from '../../../component/ScreenDescription';
import Geolocation from 'react-native-geolocation-service';
import Toast from 'react-native-toast-message';
import style from './style';
import {scale} from 'react-native-size-matters';
import {isEmpty} from 'lodash';

Geocoder.init('AIzaSyCHMAdJH0T0nfMFglo9KbpJcnZ2-DfepyA');

const CheckInOut = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [prve, setPrve] = useState(0);
  const [next, setNext] = useState(5);
  const [pageCurrent, setpageCurrent] = useState(1);

  const isLoading = useSelector(
    state => state.loading.effects.attendance.getAttendanceHistory,
  );

  const isFaceLoading = useSelector(
    state => state.loading.effects.attendance.checkIn,
  );
  const userLocation = useSelector(state => state.user?.userLocation);
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);

  const userLatLong = useSelector(state => state.user?.userLatLong);
  const companyData = useSelector(state => state.company?.companyData);
  const attendanceHistory = useSelector(
    state => state.attendance?.attendanceHistory,
  );

  useEffect(() => {
    getAttendanceData();
  }, [isFocused]);

  useEffect(async () => {
    getAttendanceData();
  }, []);

  const getAttendanceData = () => {
    dispatch.company.get({token});
    dispatch.attendance.getAttendanceHistory({token, id: user?.id});
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
              dispatch.user.setUserLocation(city);
              dispatch.user.setUserLatLong(NY);
            })
            .catch(error => console.warn(error));
        },
        error => {
          // See error code charts below.
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else if (Platform.OS === 'ios') {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 300000,
      })
        .then(location => {
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
            dispatch.user.setUserLatLong(NY);
            dispatch.user.setUserLocation(city);
          });
          // setIsLoading(false);
        })
        .catch(ex => {
          const {code, message} = ex;
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
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }
  const onCheckInOutBtn = () => {
    var lat2 = userLatLong?.lat;
    var lon2 = userLatLong?.lng;

    let lat1 = companyData?.lat;
    let lon1 = companyData?.long;

    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    if (d > 1) {
      Toast.show({type: 'error', text1: 'You should be around the company.'});
    } else {
      navigation.navigate('CheckInOut');
    }
  };
  return (
    <SafeAreaView style={style.containerView}>
      <Header
        isblank
        label={'View Attendances'}
        labelStyle={style.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getAttendanceData}
            refreshing={isLoading}
          />
        }
        showsVerticalScrollIndicator={false}
        style={style.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'View all of your registered'}
          description2={'attendance here. Click on the respective'}
          description3={'button to edit or view the details'}
        />

        <View style={style.searchBtnView}>
          <Button
            label={'Check In/Out'}
            btnStyle={style.browseBtn}
            labelStyle={style.browseTxt}
            onPress={onCheckInOutBtn}
          />
        </View>

        <Table
          data={attendanceHistory?.data}
          pageCurrent={pageCurrent}
          next={next}
          prve={prve}
          setPrve={setPrve}
          setNext={setNext}
          setpageCurrent={setpageCurrent}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CheckInOut;
