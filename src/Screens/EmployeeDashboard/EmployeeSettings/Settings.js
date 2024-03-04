import React from 'react';
import {View} from 'react-native';

import Box from '../../../component/Box';
import DropDown from '../../../component/DropDown';

import styles from './style';

const Settings = ({
  isError,
  documentExpiryArr,
  openDocumentExpiry,
  documentExpiryValue,
  setDocumentExpiryArr,
  setOpenDocumentExpiry,
  setDocumentExpiryValue,
  workPassExpiryArr,
  openWorkPassExpiry,
  workPassExpiryValue,
  setWorkPassExpiryArr,
  setOpenWorkPassExpiry,
  setWorkPassExpiryValue,
}) => {
  return (
    <Box
      label={'Settings'}
      children={
        <View style={styles.mainView}>
          <DropDown
            label={'Work Pass Expiry Notification*'}
            placeholder="Select Option…"
            open={openWorkPassExpiry}
            value={workPassExpiryValue}
            items={workPassExpiryArr}
            setOpen={setOpenWorkPassExpiry}
            setValue={setWorkPassExpiryValue}
            setItems={setWorkPassExpiryArr}
            dropDownDirection={'BOTTOM'}
            isError={isError}
            dropDownStyle={styles.indTypeDropDown}
          />

          <DropDown
            label={'Document Expiry Notification*'}
            placeholder="Select Option…"
            open={openDocumentExpiry}
            value={documentExpiryValue}
            items={documentExpiryArr}
            setOpen={setOpenDocumentExpiry}
            setValue={setDocumentExpiryValue}
            setItems={setDocumentExpiryArr}
            dropDownDirection={'TOP'}
            isError={isError}
            dropDownStyle={styles.indTypeDropDown}
          />
        </View>
      }
    />
  );
};

export default Settings;
