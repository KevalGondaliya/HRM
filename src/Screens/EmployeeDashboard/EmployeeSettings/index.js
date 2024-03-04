import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Settings from './Settings';
import Header from '../../../component/Header';
import {booleanData} from '../../../dummyData';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

function EmployeeSettings({navigation}) {
  const [isError, setIsError] = useState(false);

  const [workPassExpiryArr, setWorkPassExpiryArr] = useState(booleanData);
  const [workPassExpiryValue, setWorkPassExpiryValue] = useState('');
  const [openWorkPassExpiry, setOpenWorkPassExpiry] = useState(false);
  const [documentExpiryArr, setDocumentExpiryArr] = useState(booleanData);
  const [documentExpiryValue, setDocumentExpiryValue] = useState('');
  const [openDocumentExpiry, setOpenDocumentExpiry] = useState(false);

  const onSaveBtnPress = () => {
    if (workPassExpiryValue != '' && documentExpiryValue != '') {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const cancelBtn = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Employee Settings'}
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
          description1={'Manage employee settings within the company here.'}
        />

        <Settings
          isError={isError}
          workPassExpiryArr={workPassExpiryArr}
          setWorkPassExpiryArr={setWorkPassExpiryArr}
          workPassExpiryValue={workPassExpiryValue}
          setWorkPassExpiryValue={setWorkPassExpiryValue}
          openWorkPassExpiry={openWorkPassExpiry}
          setOpenWorkPassExpiry={setOpenWorkPassExpiry}
          documentExpiryArr={documentExpiryArr}
          setDocumentExpiryArr={setDocumentExpiryArr}
          documentExpiryValue={documentExpiryValue}
          setDocumentExpiryValue={setDocumentExpiryValue}
          openDocumentExpiry={openDocumentExpiry}
          setOpenDocumentExpiry={setOpenDocumentExpiry}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={onSaveBtnPress}
          label={'Save'}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default EmployeeSettings;
