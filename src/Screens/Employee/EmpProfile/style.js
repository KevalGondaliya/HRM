import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  keyboardAwareScrollView: {paddingHorizontal: scale(23)},
  containerView: {flex: 1, backgroundColor: Colors.white},
  labelStyle: {marginLeft: scale(-10)},
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: scale(73 / 2),
  },
  userImageMainView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  userImageView: {
    width: scale(73),
    height: scale(73),
    borderRadius: scale(73 / 2),
  },
  editIcon: scale(15),
  statusBtn: {
    width: '100%',
    height: scale(45),
    backgroundColor: '#719B80',
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: scale(10),
  },
  statusTxt: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '600',
    marginRight: scale(10),
  },
  buttonMainView: {
    width: scale(150),
    height: scale(40),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackPearl,
  },
  btnTxt: {
    fontSize: scale(12),
    color: Colors.white,
    fontWeight: '700',
  },
  modalMainView: {
    width: '100%',
    minHeight: scale(50),
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(30),
    paddingVertical: scale(45),
  },
  modalLabel: {
    fontSize: scale(16),
    color: Colors.sBlack,
    textAlign: 'center',
    marginBottom: scale(0),
  },
  saveBtn: {marginTop: scale(25)},
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
};
