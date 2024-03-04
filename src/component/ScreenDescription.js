import React from 'react';
import {scale} from 'react-native-size-matters';
import {Text, View, StyleSheet} from 'react-native';

import Colors from '../theme';

function ScreenDescription(props) {
  return (
    <View style={[styles.fillTheFormTxtView, props.style]}>
      <Text style={styles.fillTheFormTxt}>{props.description1}</Text>
      {props.description2 && (
        <Text style={[styles.fillTheFormTxt, props.txtStyle]}>
          {props.description2}
        </Text>
      )}
      {props.description3 && (
        <Text style={styles.fillTheFormTxt}>{props.description3}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fillTheFormTxtView: {
    width: '100%',
    alignItems: 'center',
    marginBottom: scale(15),
    paddingHorizontal: scale(18),
  },
  fillTheFormTxt: {
    color: Colors.sBlack,
    fontSize: scale(13),
  },
});

export default ScreenDescription;
