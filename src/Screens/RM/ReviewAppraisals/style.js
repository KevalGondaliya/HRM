import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  keyboardAwareScrollView: {
    flex: 0.92,
    paddingHorizontal: scale(18),
  },
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(40),
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
    lineHeight: scale(25),
    marginTop: scale(8),
  },
  datePickerView: {
    width: '100%',
    height: scale(43),
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(18),
  },
  dateTxt: {fontSize: scale(12)},
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
  tbHeaderView: {
    borderWidth: 1,
    paddingVertical: scale(20),
    paddingHorizontal: scale(18),
    borderColor: '#D5D5D3',
    borderRadius: scale(15),
    marginBottom: scale(15),
  },
  tbHeaderTxt: {
    color: Colors.blackPearl,
    fontWeight: '800',
    marginTop: 0,
  },
  tbContainerView: {
    paddingVertical: scale(15),
    paddingHorizontal: scale(5),
  },
  summaryContainer: {
    paddingVertical: scale(15),
    paddingHorizontal: scale(15),
  },
  totalScore: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    fontWeight: '800',
  },
  browseBtn: {
    paddingHorizontal: scale(25),
    marginTop: scale(15),
    backgroundColor: Colors.blackPearl,
    width: '60%',
    marginRight: scale(10),
  },
  browseTxt: {fontSize: scale(11)},
};
