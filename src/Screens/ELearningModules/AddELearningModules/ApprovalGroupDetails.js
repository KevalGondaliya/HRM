import React, {Fragment} from 'react';
import {View, Text} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import Button from '../../../component/Button';
import TextInput from '../../../component/TextInput';
import DropDowns from '../../../component/DropDowns';
import Validator from '../../../utility/validator';
import {useDispatch, useSelector} from 'react-redux';
import {completedMonthData, eLearningTypeArr} from '../../../utility/constant';

import styles from './style';

const ApprovalGroupDetails = ({
  setTitle,
  title,
  isError,
  isView,
  departmentArr,
  departmentValue,
  setDepartmentValue,
  positionsArr,
  positionsValue,
  setPositionsValue,
  description,
  setDescription,
  uploadDocument,
  handleDocumentSelection,
  removeBtnPress,
  periodValue,
  setPeriodValue,
  eLearningTypeValue,
  setELearningTypeValue,
}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.session?.token);

  const onDepartmentChange = item => {
    dispatch.relationValue.getDepartmentPosition({token, id: item.value});
    setPositionsValue('');
  };
  return (
    <Box
      label={'Deduction Types'}
      children={
        <Fragment>
          <DropDowns
            label={'E-Learning Type*'}
            placeholder="Select E-Learning Type..."
            data={eLearningTypeArr || []}
            value={eLearningTypeValue}
            onChange={item => {
              setELearningTypeValue(item.value);
            }}
            disable={isView ? true : false}
            style={isError && eLearningTypeValue == '' && styles.error}
            isError={isError && eLearningTypeValue == ''}
          />

          <Text style={styles.userNameTxt}>E-Learning Module Title*</Text>
          <TextInput
            onChangeText={setTitle}
            value={title}
            style={styles.userNameTextInput}
            isError={isError && title == ''}
            placeholder={'Enter Title…'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
            validationPlaceHolder={'E-Learning Module Title'}
            isValidationError={
              title != '' && Validator.validateTextInput(title) == false
                ? true
                : false
            }
          />

          <View style={styles.firstNameMainView}>
            <View style={styles.width48}>
              <DropDowns
                label={'Department*'}
                placeholder="Select Depart…"
                data={departmentArr || []}
                value={departmentValue}
                onChange={item => {
                  onDepartmentChange(item);
                  setDepartmentValue(item.value);
                }}
                disable={isView ? true : false}
                isError={isError && departmentValue == ''}
                style={isError && departmentValue == '' && styles.error}
              />
            </View>

            <View style={styles.width48}>
              <DropDowns
                label={'Positions*'}
                placeholder="Select Positi…"
                data={positionsArr || []}
                value={positionsValue}
                onChange={item => {
                  setPositionsValue(item.value);
                }}
                disable={isView ? true : false}
                style={isError && positionsValue == '' && styles.error}
                isError={isError && positionsValue == ''}
              />
            </View>
          </View>

          <Text style={styles.userNameTxt}>Module Description*</Text>

          <TextInput
            multiline={true}
            value={description}
            placeholder={'Enter Description…'}
            onChangeText={setDescription}
            placeholderTextColor={Colors.lightRed}
            isError={isError && description == ''}
            style={[styles.userNameTextInput, styles.multilineTextInput]}
            editable={isView ? false : true}
            validationPlaceHolder={'Module Description'}
            isValidationError={
              description != '' &&
              Validator.validateTextInput(description) == false
                ? true
                : false
            }
          />
          <DropDowns
            label={'E-Learning Period*'}
            placeholder="Select Period…"
            data={completedMonthData || []}
            value={periodValue}
            onChange={item => {
              setPeriodValue(item.value);
            }}
            disable={isView ? true : false}
            style={isError && periodValue == '' && styles.error}
            isError={isError && periodValue == ''}
          />

          <Text style={styles.userNameTxt}>Upload File*</Text>

          <TextInput
            editable={false}
            placeholder={'Upload File…'}
            value={uploadDocument}
            style={styles.userNameTextInput}
            placeholderTextColor={Colors.lightRed}
            isError={isError && uploadDocument == ''}
          />

          <View style={styles.browseBtnView}>
            <Button
              label={'Browse Files…'}
              btnStyle={styles.browseBtn}
              labelStyle={styles.browseTxt}
              onPress={handleDocumentSelection}
              disabled={isView && true}
            />

            <Button
              label={'Remove'}
              btnStyle={styles.removeBtn}
              labelStyle={styles.browseTxt}
              onPress={removeBtnPress}
              disabled={isView && true}
            />
          </View>
        </Fragment>
      }
    />
  );
};

export default ApprovalGroupDetails;
