import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import DropShadow from 'react-native-drop-shadow';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../theme';
import addIcon from '../assets/svg/addIcon.svg';

function Box(props) {
  return (
    <DropShadow style={[style.dropShadow, props.style]}>
      <View style={style.boxHeaderView}>
        <Text style={[style.boxHeaderTxt]}>{props.label}</Text>

        {props.isAdd && (
          <TouchableOpacity
            onPress={props.addIconPress}
            style={style.plusIconView}>
            <SvgXml xml={addIcon} width={scale(20)} height={scale(20)} />
          </TouchableOpacity>
        )}

        {props.isClose && (
          <TouchableOpacity
            onPress={props.onCloseBtn}
            style={style.plusIconView}>
            <Icon
              name={'close'}
              type={'AntDesign'}
              color={Colors.white}
              size={scale(20)}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={[style.boxContaintView, props.childrenStyle]}>
        {props.children}
      </View>
    </DropShadow>
  );
}

const style = StyleSheet.create({
  dropShadow: {
    width: '100%',
    minHeight: scale(50),
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    padding: 5,
    marginBottom: scale(15),
  },
  boxHeaderView: {
    width: '100%',
    height: scale(40),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    backgroundColor: Colors.blackPearl,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxHeaderTxt: {
    fontSize: scale(13),
    color: Colors.white,
    fontWeight: '900',
  },
  boxContaintView: {
    width: '100%',
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    backgroundColor: Colors.white,
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
  },
  boxContaintView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalHeadCount: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '600',
    width: '80%',
  },
  plusIconView: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: scale(30),
  },
});

export default Box;
