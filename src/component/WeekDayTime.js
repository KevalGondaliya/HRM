import moment from 'moment';
import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import DropShadow from 'react-native-drop-shadow';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../theme';
import {weekDay} from '../utility/constant';

const WeekDayTime = props => {
  const [type, setType] = useState('');
  const [count, setCount] = useState(0);
  const [selcectItem, setSelectItem] = useState('');
  const [cardDayArr, setCardDayArr] = useState(weekDay);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
          arr[i].timeFrom = time;
        }
      }
      setCount(count + 1);
      setCardDayArr(arr);
    } else {
      let arr = cardDayArr;
      for (let i = 0; i < arr.length; i++) {
        if (i == index) {
          arr[i].timeTo = time;
        }
      }
      setCount(count + 1);
      setCardDayArr(arr);
    }
    hideDatePicker();
  };

  return (
    <>
      <View key={count} style={{marginBottom: scale(20)}}>
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
                    style={styles.timeFromBtn}>
                    <Text style={styles.timeTxt}>
                      {data.timeFrom
                        ? moment(data.timeFrom, 'HH  :  mm  :  ss ').format(
                            'LT',
                          )
                        : '09 : 00 AM'}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.toTxt}>to</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectItem(index);
                      showDatePicker('to');
                    }}
                    style={styles.timeFromBtn}>
                    <Text style={styles.timeTxt}>
                      {data.timeTo
                        ? moment(data.timeTo, 'HH  :  mm  :  ss ').format('LT')
                        : '06 : 00 PM'}
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
const styles = StyleSheet.create({
  cardMainView: {
    width: '100%',
    minHeight: scale(50),
    backgroundColor: Colors.blackPearl,
    paddingHorizontal: scale(18),
    paddingVertical: scale(10),
    alignSelf: 'center',
  },
  cardDayTxt: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '700',
    letterSpacing: 2,
  },
  halfDayTxtView: {
    height: scale(47),
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIconView: {
    width: scale(25),
    height: scale(25),
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfDayTxt: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '600',
    marginLeft: scale(20),
  },
  timeView: {
    height: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(8),
    alignItems: 'center',
  },
  timeFromBtn: {
    width: '42%',
    height: scale(40),
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  toTxt: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '600',
  },
  dropShadow: {
    paddingVertical: scale(5),
    marginBottom: scale(5),
  },
  timeTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    fontWeight: 'bold',
  },
});
export default WeekDayTime;
