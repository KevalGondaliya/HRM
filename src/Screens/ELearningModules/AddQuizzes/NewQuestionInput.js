import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import DropShadow from 'react-native-drop-shadow';

import Colors from '../../../theme';
import TextInput from '../../../component/TextInput';
import Validator from '../../../utility/validator';

import styles from './style';

const NewQuestionInput = ({question, setQuestion, isError}) => {
  return (
    <View style={styles.questionTextinputMainView}>
      <DropShadow style={styles.dropShadow}>
        <TextInput
          placeholder="Enter Question Here…"
          style={styles.textInputView}
          value={question}
          onChangeText={setQuestion}
          placeholderTextColor={Colors.lightRed}
          isError={isError && question == ''}
          validationPlaceHolder={'Enter Question Here'}
          isValidationError={
            question != '' && Validator.validateTextInput(question) == false
              ? true
              : false
          }
        />
      </DropShadow>

      <DropShadow style={[styles.dropShadow, styles.width20]}>
        <View style={styles.dotView}>
          <Icon
            name={'dots-three-vertical'}
            type={'entypo'}
            size={scale(30)}
            color={Colors.sBlack}
          />
        </View>
      </DropShadow>
    </View>
  );
};

export default NewQuestionInput;
