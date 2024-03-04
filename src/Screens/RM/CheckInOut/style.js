import { Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';

import Colors from '../../../theme';
const windowHeight = Dimensions.get('window').height;

export default {
  containerView: {
    width: '100%',
    paddingHorizontal: scale(20),
  },
  labelStyle: { marginLeft: scale(-10) },
  KeyboardAwareScrollView: { paddingHorizontal: scale(15) },
  userNameTextInput1: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: 5,
    marginBottom: 0,
    borderWidth: 0,
    marginRight: scale(10),
  },
  mapView: {
    width: '100%',
    height: scale(200),
    marginVertical: scale(15),
    borderRadius: scale(15),
    overflow: 'hidden',
  },
  listViews: {
    backgroundColor: 'white',
    borderColor: '#c3c3c3',
    width: '100%',
  },

  searchBtnView: {
    width: '100%',
    paddingHorizontal: scale(8),
    marginTop: scale(10),
    minHeight: scale(40),
    flexDirection: 'row',
    justifyContent: 'center',
  },

  browseBtn: {
    paddingHorizontal: scale(15),
    backgroundColor: Colors.blackPearl,
    width: '48%',
    marginTop: scale(15),
  },
  camera: {
    height: windowHeight - 250,
    width: '100%',
  },
  browseTxt: { fontSize: scale(11) },
  bound: ({ width, height, x, y }) => {
    return {
      position: 'absolute',
      top: y,
      left: x - 50,
      height,
      width,
      borderWidth: 5,
      borderColor: 'lightgreen',
      zIndex: 3000,
    };
  },
  loadingLayer: {
    position: 'absolute',
    height: windowHeight - 250,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#000',
    opacity: 0.5,
    zIndex: 999,
  },
};
