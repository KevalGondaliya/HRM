import React, {Fragment} from 'react';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import DropShadow from 'react-native-drop-shadow';
import {View, Text, TouchableOpacity} from 'react-native';
import {RadioGroup} from 'react-native-radio-buttons-group';

import Colors from '../../../theme';
import TextInput from '../../../component/TextInput';
import gallery from '../../../assets/svg/gallery.svg';
import RadioButtons from '../../../component/RadioButton';

import styles from './style';

const InsertMedia = ({
  onChange,
  questionType,
  textBoxAns,
  setTextBoxAns,
  isError,
  isTrue,
  setIsTrue,
  handleDocumentSelection,
  uploadDocument,
  multiCheckDataArr,
  multiChoiceDataArr,
  onMultiChoiceChange,
  onPressRadioButton,
  radioButtonsDataArr,
}) => {
  return (
    <Fragment>
      <TouchableOpacity
        onPress={handleDocumentSelection}
        style={[
          styles.svgMainView,
          {
            // borderColor:
            //   isError && uploadDocument == '' ? 'red' : Colors.lightRed,
          },
        ]}>
        <SvgXml xml={gallery} width={scale(43)} height={scale(43)} />
        <Text style={styles.insertTxt}>Insert Any Media Here</Text>
      </TouchableOpacity>

      {questionType == 'Text-Box' ? (
        <TextInput
          multiline
          value={textBoxAns}
          onChangeText={setTextBoxAns}
          isError={isError && textBoxAns === ''}
          style={styles.userNameTextInput}
          placeholder={'Enter Answer…'}
          placeholderTextColor={Colors.lightRed}
        />
      ) : questionType == 'True-False' ? (
        <View style={{marginLeft: scale(15)}}>
          <RadioButtons value={isTrue} onPress={setIsTrue} />
        </View>
      ) : questionType == 'Multiple-Check' ? (
        multiCheckDataArr?.map((data, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              key={index}>
              <TouchableOpacity
                onPress={() => {
                  onChange('isChecked', !data.isChecked, index);
                }}
                style={styles.checkBoxView}>
                {data.isChecked && <View style={styles.checkBoxFill}></View>}
              </TouchableOpacity>

              <DropShadow style={[styles.dropShadow, styles.width100]}>
                <View
                  style={[
                    styles.ansBtnView,
                    {
                      borderWidth: isError && data.ans == '' ? 2 : 0,
                      borderColor: isError && data.ans == '' ? 'red' : null,
                    },
                  ]}>
                  <TextInput
                    value={data.ans}
                    onChangeText={item => {
                      onChange('ans', item, index);
                    }}
                    placeholder={`Answer #${index + 1}…`}
                  />
                </View>
              </DropShadow>
            </View>
          );
        })
      ) : (
        <>
          {multiChoiceDataArr?.map((data, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                key={index}>
                <DropShadow style={[styles.dropShadow, {width: '100%'}]}>
                  <View
                    style={[
                      styles.ansBtnView,
                      {
                        borderWidth: isError && data.ans == '' ? 2 : 0,
                        borderColor: isError && data.ans == '' ? 'red' : null,
                      },
                    ]}>
                    <TextInput
                      value={data.ans}
                      onChangeText={item => {
                        onMultiChoiceChange('ans', item, index);
                      }}
                      placeholder={`Answer #${index + 1}…`}
                      // isError={isError && data.ans == ''}
                    />
                  </View>
                </DropShadow>
              </View>
            );
          })}

          <Text style={{fontSize: scale(12), color: 'red'}}>
            Select Right Answer*
          </Text>
          <RadioGroup
            radioButtons={radioButtonsDataArr}
            onPress={onPressRadioButton}
            color="#ffffff"
            containerStyle={{flexDirection: 'row'}}
          />
        </>
      )}
    </Fragment>
  );
};

export default InsertMedia;
