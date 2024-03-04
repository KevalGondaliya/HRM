import React from 'react';
import moment from 'moment';
import MapView from 'react-native-maps';
import {scale} from 'react-native-size-matters';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import DateButton from '../../../component/DateButton';

const CheckInOutBox = props => {
  return (
    <Box
      label={'Check In / Out'}
      children={
        <View style={styles.containerView}>
          <DateButton
            date={props.leaveDate}
            isError={props.isError}
            onPress={props.onDdateBtnPress}
            label={'Check In Date*'}
            disabled={props.isView ? true : false}
          />

          <View style={styles.emailView}>
            <Text style={styles.userNameTxt}>Check In</Text>

            <TouchableOpacity
              onPress={props.showDatePicker}
              style={[
                styles.userNameTextInput,
                {
                  marginRight: 0,
                  borderWidth: props.isError && props.checkIn == '' ? 2 : 0,
                  borderColor:
                    props.isError && props.checkIn == '' ? 'red' : null,
                  justifyContent: 'center',
                  paddingHorizontal: scale(18),
                },
              ]}>
              <Text style={styles.checkinTime}>
                {props.checkIn
                  ? moment(props.checkIn, 'HH:mm:ss').format('LT')
                  : ''}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.emailView]}>
            <Text style={styles.userNameTxt}>Location</Text>

            <TouchableOpacity
              onPress={() => {
                props.setIsModalVisible(true);
              }}
              style={[
                styles.userNameTextInput1,
                {
                  borderWidth: props.isError && props.location == '' ? 2 : 0,
                  borderColor:
                    props.isError && props.location == '' ? 'red' : null,
                  marginRight: 0,
                  height: scale(45),
                  justifyContent: 'center',
                  paddingHorizontal: scale(20),
                },
              ]}>
              <Text
                style={{
                  fontSize: scale(13),
                  color: Colors.sBlack,
                  fontWeight: '600',
                }}>
                {props.location}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mapView} key={props.count}>
            <MapView
              showsUserLocation={true}
              initialRegion={{
                latitude: Number(props.latitude),
                longitude: Number(props.longitude),
                latitudeDelta: 0.25,
                longitudeDelta: 0.0421,
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },
  dobMainView: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(-5),
  },
  width28: {width: '28%'},
  width40: {width: '40%'},
  dateView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    marginRight: scale(10),
  },
  radioButtonView: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerView: {paddingBottom: scale(18)},
  dropDownStyle: {marginBottom: scale(2)},
  gstView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(2),
  },
  checkinTime: {
    fontSize: scale(13),
    color: Colors.sBlack,
    fontWeight: '600',
  },
  userNameTextInput1: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: 5,
    marginBottom: 0,
    borderWidth: 0,
    marginRight: scale(10),
  },
  mapView: {
    width: '100%',
    height: scale(200),
    marginTop: scale(15),
    borderRadius: scale(15),
    overflow: 'hidden',
  },
  emailView: {
    width: '100%',
  },
});

export default CheckInOutBox;
