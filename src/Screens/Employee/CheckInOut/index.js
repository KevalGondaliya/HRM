import moment from 'moment';
import { View, Text, Image, ActivityIndicator, Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../theme';
import Geolocation from 'react-native-geolocation-service';
import Header from '../../../component/Header';
import Button from '../../../component/Button';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

const CheckInOut = ({ navigation }) => {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const cameraRef = useRef(null);
  const [box, setBox] = useState(null);
  const [userImage, setUserImage] = useState('');
  const isFocused = useIsFocused();
  const [leaveDate, setLeaveDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [type, setType] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState('');
  const [count, setCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [location, setLoaction] = useState('');
  const [latitude, setLatitude] = useState(1.3521);
  const [longitude, setLongitude] = useState(103.8198);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [captureImages, setCaptureImages] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const scrollToItem = useRef(null);
  const userLocation = useSelector(state => state.user.userLocation);
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);

  const viewAttendancesData = useSelector(state => state.attendance);
  const isViewAttendancesLoading = useSelector(
    state => state.loading.effects.attendance,
  );

  const isFaceLoading = useSelector(state => state.attendance.isFaceLoading);
  const faceMessage = useSelector(state => state.attendance.faceMessage);

  useEffect(() => {
    if (viewAttendancesData?.checkInTime) {
      let data = viewAttendancesData?.checkInTime?.data;
      if (data?.length > 0 && data[0]?.check_out == null) {
        setIsCheck(true);
        setType('checkOut');
      } else {
        setIsCheck(false);
        setType('checkIn');
      }
    }
  }, [viewAttendancesData]);

  useEffect(() => {
    dispatch.attendance.getCheckInTime({ token, id: user?.id });
    setUserImage('');
  }, [isFocused]);

  useEffect(() => {
    if (viewAttendancesData?.checkIn || viewAttendancesData?.checkOutTime) {
      setTimeout(() => {
        setUserImage('');
        dispatch.attendance.setFaceMassage('');
        dispatch.attendance.saveCheckIn(null);
        dispatch.attendance.setCheckOutTime(null);
        cancelBtn();
      }, 3000);
    } else {
      setTimeout(() => {
        setBox(null);
        setUserImage('');
        dispatch.attendance.setFaceMassage('');
      }, 3000);
    }
  }, [
    viewAttendancesData?.checkIn ||
    viewAttendancesData?.checkOutTime ||
    viewAttendancesData?.faceError,
  ]);

  const cancelBtn = () => {
    Refresh();
    navigation.navigate('ViewAttendances');
  };
  // const handleCameraClicked = () => {
  //   scrollToItem.capture()
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch(err => console.error(err));
  // };

  const takePicture = async () => {
    if (cameraRef?.current) {
      const options = { quality: 0.1, base64: true };
      const data = await cameraRef?.current.takePictureAsync(options);
      let result = data.uri.split('/');
      setUserImage(data.uri);
      setBox(null);
      let body = isCheck
        ? {
          image: data.base64,
          format: result[result.length - 1].split('.')[1],
          check_out: moment().format(),
          check_out_location: userLocation,
        }
        : {
          image: data.base64,
          format: result[result.length - 1].split('.')[1],
          check_in: moment().format(),
          check_in_location: userLocation,
        };
      let userData = {
        token,
        id: user?.id,
      };
      if (isCheck)
        dispatch.attendance.setCheckOut({ token: token, body, userData });
      else dispatch.attendance.checkIn({ token: token, body, userData });
    }
  };
  const handlerFace = ({ faces }) => {
    if (faces[0]) {
      setBox({
        boxs: {
          width: faces[0].bounds.size.width,
          height: faces[0].bounds.size.height,
          x: faces[0].bounds.origin.x,
          y: faces[0].bounds.origin.y,
          yawAngle: faces[0].yawAngle,
          rollAngle: faces[0].rollAngle,
        },
        rightEyePosition: faces[0].rightEyePosition,
        leftEyePosition: faces[0].leftEyePosition,
        bottomMounthPosition: faces[0].bottomMounthPosition,
      });
    } else {
      setBox(null);
    }
  };
  const Refresh = () => {
    setCheckIn('');
    setLeaveDate('');
    setLoaction('');
    setLatitude(1.3521);
    setLongitude(103.8198);
    setCheckOut('');
    setCheckOutDate('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header
        isblank
        label={'Check In / Out'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />

      <View style={styles.KeyboardAwareScrollView}>
        <ScreenDescription
          description1={'Register your check in / out date and location'}
          description2={'here. You can only check in when you are'}
          description3={'within the radius.'}
        />
        <View>
          {console.log("cameraRef", userImage)}
          {userImage !== '' ? (
            <Image
              source={{ uri: userImage }}
              style={[styles.camera, { transform: [{ rotateY: '180deg' }] }]}
            />
          ) : (
            <RNCamera
              type="front"
              actions={{
                rightButtonText: 'Done',
                leftButtonText: 'Cancel',
              }}
              ref={cameraRef}
              onFacesDetected={handlerFace}
              faceDetectionLandmarks={
                RNCamera.Constants.FaceDetection.Landmarks.all
              }
              style={styles.camera}
            />
          )}
          {box && (
            <>
              <View
                style={styles.bound({
                  width: box.boxs.width,
                  height: box.boxs.height,
                  x: box.boxs.x + 50,
                  y: box.boxs.y,
                })}
              />
            </>
          )}

          {Boolean(isFaceLoading) ? (
            <View style={styles.loadingLayer}>
              {Boolean(isFaceLoading) && faceMessage == '' ? (
                <ActivityIndicator size={'large'} color={'#fff'} />
              ) : null}
              {faceMessage == 'Attendance added' && (
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: scale(20),
                  }}>{`Thank you ${user?.user_name} ${isCheck == false ? 'Check In' : 'Check Out'
                    } completed`}</Text>
              )}
              {faceMessage === 'Check-Out Done' && (
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: scale(20),
                  }}>{`Thank you ${user?.user_name} ${isCheck == false ? 'Check In' : 'Check Out'
                    } completed`}</Text>
              )}
              {faceMessage == 'Face not matched!' && (
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: scale(20),
                  }}>{`Sorry, ${user?.user_name} Your face not matched. Try Again!`}</Text>
              )}
            </View>
          ) : (
            <View></View>
          )}
        </View>
        <View
          style={[
            styles.searchBtnView,
            { opacity: isFaceLoading || isDisabled ? 0.8 : 1 },
          ]}
          pointerEvents={isFaceLoading || isDisabled ? 'none' : 'auto'}>
          <Button
            label={isCheck == false ? 'Check In' : 'Check Out'}
            btnStyle={styles.browseBtn}
            labelStyle={styles.browseTxt}
            onPress={takePicture}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckInOut;
