import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';
import Button from '../../../component/Button';

const SingleButton = props => {
  return (
    <View style={styles.BtnView}>
      <Button
        label={'Single Onboard'}
        btnStyle={[
          styles.cancelBtn,
          {
            backgroundColor: props.singleOnBoard ? Colors.blackPearl : null,
            borderWidth: props.singleOnBoard ? 0 : 2,
          },
        ]}
        labelStyle={[
          styles.massDelTxt,
          {
            color: props.singleOnBoard ? Colors.white : Colors.blackPearl,
          },
        ]}
        onPress={() => {
          props.setSingleOnBoard(true);
        }}
      />

      <Button
        label={'Mass Onboard'}
        btnStyle={[
          styles.cancelBtn,
          {
            backgroundColor: props.singleOnBoard ? null : Colors.blackPearl,
            borderWidth: props.singleOnBoard ? 2 : 0,
          },
        ]}
        labelStyle={[
          styles.massDelTxt,
          {color: props.singleOnBoard ? Colors.blackPearl : Colors.white},
        ]}
        onPress={() => {
          props.setSingleOnBoard(false);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchBtnView: {
    width: '100%',
    height: scale(45),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(18),
    marginBottom: scale(15),
  },
  cancelBtn: {
    paddingHorizontal: scale(18),

    width: scale(145),
    height: scale(50),
    borderRadius: scale(10),
  },
  massDelTxt: {fontSize: scale(12)},
  BtnView: {
    width: '100%',
    height: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(13),
    justifyContent: 'space-between',
    marginBottom: scale(5),
  },
});
export default SingleButton;
