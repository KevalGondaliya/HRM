import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Settings from './Settings';
import Header from '../../../component/Header';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

function ClaimSettings({navigation}) {
  const [year, setYear] = useState('');
  const [isError, setIsError] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const cancelBtn = () => {
    navigation.goBack();
  };

  const onSaveBtnPress = () => {
    if (year != '') {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handleConfirm = date => {
    setYear(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onDateBtnPress = () => {
    setDatePickerVisibility(true);
  };
  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Claim Settings'}
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
          description1={'Manage claim settings within the company here.'}
          style={{paddingHorizontal: 0}}
        />

        <Settings isError={isError} year={year} onPress={onDateBtnPress} />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={onSaveBtnPress}
          label={'Save'}
        />
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        mode="date"
        onCancel={hideDatePicker}
        onConfirm={handleConfirm}
        isVisible={isDatePickerVisible}
      />
    </SafeAreaView>
  );
}

export default ClaimSettings;
