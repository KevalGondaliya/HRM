import {scale} from 'react-native-size-matters';

import Colors from '../../../theme';

export default {
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },
  keyboardAwareScrollView: {paddingHorizontal: scale(22)},
  dropShadow: {
    width: '100%',
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    padding: 5,
    marginBottom: scale(5),
    borderRadius: scale(20),
    marginTop: scale(10),
  },
  videoFrame: {
    width: '100%',
    minHeight: scale(200),
    backgroundColor: '#fff',
    borderRadius: scale(20),
    padding: scale(20),
  },
  questionTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    fontWeight: 'bold',
  },
  checkBoxView: {
    width: scale(20),
    height: scale(20),
    borderWidth: 2,
    borderColor: Colors.blackPearl,
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxFill: {
    width: '90%',
    height: '90%',
    backgroundColor: Colors.blackPearl,
    borderRadius: scale(5),
  },
  optionTxt: {
    fontSize: scale(12),
    color: Colors.blackPearl,
    marginLeft: scale(10),
  },
  checkBoxMainView: {
    alignItems: 'center',
    marginTop: scale(15),
    flexDirection: 'row',
  },
  question1Txt: {fontWeight: '600', top: scale(5), marginBottom: scale(10)},
  rigthANsIconView: {
    width: '100%',
    height: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalTxt: {
    fontSize: scale(14),
    color: Colors.blackPearl,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: scale(10),
  },
  searchBtnView: {
    width: '100%',
    alignItems: 'center',
    marginVertical: scale(10),
  },

  browseBtn: {
    paddingHorizontal: scale(15),
    width: '48%',
  },
  browseTxt: {fontSize: scale(10)},

  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: scale(2),
    zIndex: 10,
    height: scale(120),
    textAlignVertical: 'top',
    paddingVertical: scale(15),
  },
  optionTxt: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '600',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(5),
  },
};
