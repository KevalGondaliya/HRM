import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';

import Colors from '../theme';

function Header(props) {
  return (
    <View style={[styles.headerMainView, props.style]}>
      <View style={styles.isBackView}>
        {props.isblank ? (
          <TouchableOpacity onPress={props.onMenuPress} style={styles.backBtn}>
            <Icon name={'menu'} type={'entypo'} style={styles.menuIcon} />
          </TouchableOpacity>
        ) : props.isBack ? (
          <TouchableOpacity onPress={props.onBackPress} style={styles.backBtn}>
            <Icon name={'left'} type={'antdesign'} style={styles.menuIcon} />

            <Text style={{color: Colors.sBlack}}>Back</Text>
          </TouchableOpacity>
        ) : (
          <Image
            source={require('../assets/Hexagonal-infinite-logo.png')}
            style={styles.appLogo}
          />
        )}
      </View>

      <View style={[styles.labelView, props.labelStyle]}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={styles.profileView} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerMainView: {
    width: '100%',
    height: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: scale(18),
  },
  isBackView: {
    width: '25%',
    height: '100%',
  },
  backBtn: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  appLogo: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  labelView: {
    width: '55%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: scale(14),
    fontWeight: '500',
    color: Colors.black,
  },
  profileView: {
    width: '20%',
    height: '100%',
  },
  menuIcon: {
    marginLeft: scale(-12),
    width: 50,
  },
});

export default Header;
