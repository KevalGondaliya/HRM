import {View} from 'react-native';
import React, {Fragment} from 'react';

import Button from '../../../component/Button';

import styles from './style';
import Colors from '../../../theme';

const QuestionTypeBtn = ({onTypeBtnPress, setIsError, questionType}) => {
  return (
    <Fragment>
      <View style={styles.browseBtnView}>
        <Button
          onPress={() => {
            onTypeBtnPress('Multiple-Choice');
            setIsError(false);
          }}
          label={'Multiple-Choice'}
          btnStyle={[
            styles.browseBtn,
            {
              backgroundColor:
                questionType == 'Multiple-Choice' ? 'green' : Colors.blackPearl,
            },
          ]}
          labelStyle={styles.browseTxt}
        />

        <Button
          onPress={() => {
            onTypeBtnPress('Multiple-Check');
            setIsError(false);
          }}
          label={'Multi-Check'}
          btnStyle={[
            styles.removeBtn,
            {
              backgroundColor:
                questionType == 'Multiple-Check' ? 'green' : Colors.blackPearl,
            },
          ]}
          labelStyle={styles.browseTxt}
        />
      </View>
      <View style={[styles.browseBtnView, styles.margintop]}>
        <Button
          onPress={() => {
            onTypeBtnPress('True-False');
            setIsError(false);
          }}
          label={'True-False'}
          btnStyle={[
            styles.browseBtn,
            styles.sBlack,
            {
              backgroundColor:
                questionType == 'True-False' ? 'green' : Colors.blackPearl,
            },
          ]}
          labelStyle={styles.browseTxt}
        />

        <Button
          onPress={() => {
            onTypeBtnPress('Text-Box');
            setIsError(false);
          }}
          label={'Text Box'}
          btnStyle={[
            styles.browseBtn,
            styles.textBoxbg,
            {
              backgroundColor:
                questionType == 'Text-Box' ? 'green' : Colors.blackPearl,
            },
          ]}
          labelStyle={styles.browseTxt}
        />
      </View>
    </Fragment>
  );
};

export default QuestionTypeBtn;
