import React from 'react';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import Button from '../../../component/Button';
import closeIcon from '../../../assets/svg/closeIcon.svg';

const PendingAppraisals = props => {
  return (
    <Box
      label={'Pending Appraisals'}
      children={
        <View style={style.containerView}>
          <Text style={style.dateTxt}>To be completed by</Text>
          <Text style={style.dateTxt}>31 March 2022</Text>

          <View style={style.closeIcon}>
            <SvgXml xml={closeIcon} width={scale(60)} height={scale(60)} />
          </View>
          <Button
            label={'Start Now'}
            btnStyle={style.browseBtn}
            onPress={props.onPress}
            labelStyle={style.browseTxt}
          />
        </View>
      }
    />
  );
};
const style = StyleSheet.create({
  containerView: {
    padding: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTxt: {
    fontSize: scale(12),
    fontWeight: '700',
    color: Colors.blackPearl,
  },
  closeIcon: {
    height: scale(100),
    justifyContent: 'center',
  },
  browseBtn: {
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    backgroundColor: Colors.blackPearl,
  },
  browseTxt: {fontSize: scale(11)},
});
export default PendingAppraisals;
