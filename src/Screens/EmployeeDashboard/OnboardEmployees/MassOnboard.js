import React, {Fragment} from 'react';
import {Text, View} from 'react-native';

import Colors from '../../../theme';
import Button from '../../../component/Button';
import TextInput from '../../../component/TextInput';
import SaveCancelBtn from '../../../component/SaveCancelBtn';

import styles from './style';

const MassOnboard = ({
  isError,
  submitBtn,
  uploadDocument,
  removeBtnPress,
  setSingleOnBoard,
  handleDocumentSelection,
}) => {
  const cancelBtn = () => {
    setSingleOnBoard(true);
  };
  return (
    <Fragment>
      <Text style={styles.massOnboardTxt}>
        To mass onboard employees, please download and fill in the Excel
        template here.
      </Text>

      <Button
        label={'Download Excel Template'}
        btnStyle={[styles.cancelBtn]}
        labelStyle={styles.massDelTxt}
      />

      <Text style={styles.userNameTxt}>Upload Excel File*</Text>

      <TextInput
        value={uploadDocument}
        isError={isError && uploadDocument == ''}
        style={styles.userNameTextInput}
        editable={false}
        placeholder={'Upload File…'}
        placeholderTextColor={Colors.lightRed}
      />

      <View style={{flexDirection: 'row'}}>
        <Button
          label={'Browse Files…'}
          btnStyle={styles.browseBtn}
          labelStyle={styles.browseTxt}
          onPress={handleDocumentSelection}
        />

        <Button
          label={'Remove'}
          btnStyle={styles.removeBtn}
          labelStyle={styles.browseTxt}
          onPress={removeBtnPress}
        />
      </View>

      <SaveCancelBtn
        cancelBtn={cancelBtn}
        submitBtn={submitBtn}
        style={styles.saveCancelBtn}
        label={'Next'}
      />
    </Fragment>
  );
};

export default MassOnboard;
