import React from 'react';
import moment from 'moment';
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import MonthPicker from 'react-native-month-picker';
import { View, StyleSheet } from 'react-native';

import Colors from '../theme';

function MonthModal({ onYearChange, isOpen, onChangeMonth, value }) {
  return (
    <Modal
      backdropOpacity={0.7}
      backdropColor={Colors.black}
      isVisible={isOpen}
      animationType="slideInUp"
      onBackdropPress={onYearChange}
      transparent={true}
      style={styles.contentContainer}>
      <View style={styles.content}>
        <MonthPicker
          selectedDate={value || new Date()}
          onMonthChange={onChangeMonth}
          maxDate={moment().add(1, 'Y').format('YYYY-MM-DD')}
          nextIcon={
            <Icon
              name={'close'}
              type={'antdesign'}
              color={Colors.blackPearl}
              size={scale(20)}
            />
          }
          prevText={''}
          yearTextStyle={{ color: Colors.white }}
          selectedMonthStyle={{ borderRadius: scale(15) }}
          onYearChange={onYearChange}
        />
        <View style={styles.confirmButton} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  content: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 70,
  },
  confirmButton: {
    padding: 15,
    margin: 10,
  },
});

export default MonthModal;
