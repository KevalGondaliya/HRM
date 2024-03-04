import React from 'react';
import moment from 'moment';
import {Icon} from 'react-native-elements';
import DropShadow from 'react-native-drop-shadow';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Colors from '../../theme';

import styles from './style';

const WeekDayTime = ({
  type,
  setType,
  count,
  setCount,
  selcectItem,
  setSelectItem,
  cardDayArr,
  setCardDayArr,
  isDatePickerVisible,
  setDatePickerVisibility,
  isError,
}) => {
  const onHalfDayBtnPress = (item, index) => {
    let arr = cardDayArr;
    for (let i = 0; i < arr.length; i++) {
      if (i == index) {
        arr[i].isHalfDay = !arr[i].isHalfDay;
      }
    }
    setCount(count + 1);
    setCardDayArr(arr);
  };

  const showDatePicker = type => {
    setType(type);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    let time = `${date.getHours()}:${date.getMinutes()}`;
    let index = selcectItem;
    if (type == 'from') {
      let arr = cardDayArr;
      for (let i = 0; i < arr.length; i++) {
        if (i == index) {
          arr[i].time.from = time;
        }
      }
      setCount(count + 1);
      setCardDayArr(arr);
    } else {
      let arr = cardDayArr;
      for (let i = 0; i < arr.length; i++) {
        if (i == index) {
          arr[i].time.to = time;
        }
      }
      setCount(count + 1);
      setCardDayArr(arr);
    }
    hideDatePicker();
  };

  return (
    <>
      <View key={count}>
        {cardDayArr.map((data, index) => {
          return (
            <DropShadow style={styles.dropShadow} key={index}>
              <View style={styles.cardMainView}>
                <Text style={styles.cardDayTxt}>{data.dayName}</Text>

                <View style={styles.halfDayTxtView}>
                  <TouchableOpacity
                    onPress={() => {
                      onHalfDayBtnPress(data, index);
                    }}
                    style={styles.checkIconView}>
                    {data.isHalfDay ? (
                      <Icon
                        name={'check'}
                        type={'Entypo'}
                        size={20}
                        color={Colors.blackPearl}
                      />
                    ) : null}
                  </TouchableOpacity>

                  <Text style={styles.halfDayTxt}>Half Day</Text>
                </View>

                <View style={styles.timeView}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectItem(index);
                      showDatePicker('from');
                    }}
                    style={[
                      styles.timeFromBtn,
                      isError && data?.time?.from == '' && styles.error,
                    ]}>
                    <Text style={styles.timeTxt}>
                      {data.time?.from
                        ? moment(data.time?.from, 'HH  :  mm  :  ss ').format(
                            'LT',
                          )
                        : 'Select Time From'}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.toTxt}>to</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectItem(index);
                      showDatePicker('to');
                    }}
                    style={[
                      styles.timeFromBtn,
                      isError && data.time?.to == '' && styles.error,
                    ]}>
                    <Text style={styles.timeTxt}>
                      {data.time?.to
                        ? moment(data.time?.to, 'HH  :  mm  :  ss ').format(
                            'LT',
                          )
                        : 'Select Time To'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </DropShadow>
          );
        })}
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default WeekDayTime;
