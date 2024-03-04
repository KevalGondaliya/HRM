import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../../component/Header';
import ApprovalGroupDetails from './ApprovalGroupDetails';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import Validator from '../../../utility/validator';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';
import {useIsFocused} from '@react-navigation/native';

function AddDeductionTypes({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [isError, setIsError] = useState(false);
  const [description, setDescription] = useState('');
  const [isInstalments, setIsInstalments] = useState(true);
  const [isDocuments, setIsDocuments] = useState(true);

  const token = useSelector(state => state.session?.token);
  const isAddDeductionType = useSelector(
    state => state.deduction?.isAddDeductionType,
  );
  const isEditDeductionType = useSelector(
    state => state.deduction?.isEditDeductionType,
  );
  const isLoading = useSelector(state => state.loading.effects.deduction?.add);
  const isEditLoading = useSelector(
    state => state.loading.effects.deduction?.update,
  );

  useEffect(() => {
    if (isAddDeductionType || isEditDeductionType) {
      dispatch.deduction.setDeductionType(false);
      dispatch.deduction.setEditElearning(false);
      cancelBtn();
    }
  }, [isAddDeductionType || isEditDeductionType]);

  useEffect(() => {
    if (editData) {
      setDescription(editData?.description);
      setIsDocuments(editData?.require_doc);
      setIsInstalments(editData?.allow_instalments);
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  const onSaveBtnPress = () => {
    if (Validator.validateTextInput(description) != '') {
      setIsError(false);
      let data = {
        description: description,
        allow_instalments: isInstalments,
        require_doc: isDocuments,
      };
      let id = editData?.id;
      if (isEdit) {
        dispatch.deduction.update({token, data, id});
      } else dispatch.deduction.add({token, data});
    } else {
      setIsError(true);
    }
  };

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };
  const refresh = () => {
    setDescription('');
    setIsDocuments(true);
    setIsInstalments(true);
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Deduction Types'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={'Add deduction types within the company here.'}
          description2={'Fill in the respective fields..'}
        />

        <ApprovalGroupDetails
          isView={isView}
          isError={isError}
          setDescription={setDescription}
          description={description}
          isInstalments={isInstalments}
          setIsInstalments={setIsInstalments}
          isDocuments={isDocuments}
          setIsDocuments={setIsDocuments}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : onSaveBtnPress}
          label={isEdit ? 'Update' : 'Submit'}
          saveLoading={isLoading || isEditLoading}
          isView={isView}
          isEdit={isEdit}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default AddDeductionTypes;
