import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import CategoryName from './Category';
import Header from '../../../component/Header';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

function ClaimTypeCategory({route, navigation}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isEdit = route?.params?.isEdit;
  const isView = route?.params?.isView;
  const editData = route?.params?.data;
  const [category, setCategory] = useState('');
  const [isError, setIsError] = useState(false);
  const token = useSelector(state => state.session?.token);
  const claimTypesCategorys = useSelector(state => state.claimTypesCategory);
  const isCategoryLoading = useSelector(
    state => state.loading.effects.claimTypesCategory,
  );

  useEffect(() => {
    if (
      claimTypesCategorys.isAddClaimTypesCategory ||
      claimTypesCategorys.isEditClaimTypesCategory
    ) {
      dispatch.claimTypesCategory.setClaimTypesCategory(false);
      dispatch.claimTypesCategory.setEditClaimTypesCategory(false);
      cancelBtn();
    }
  }, [
    claimTypesCategorys.isAddClaimTypesCategory ||
      claimTypesCategorys.isEditClaimTypesCategory,
  ]);

  useEffect(() => {
    if (editData) {
      setCategory(editData?.category);
    } else {
      refresh();
    }
  }, [editData, isFocused]);

  const cancelBtn = () => {
    refresh();
    navigation.goBack();
  };

  const refresh = () => {
    setIsError(false);
    setCategory('');
  };

  const onSaveBtnPress = () => {
    if (category != '') {
      setIsError(false);

      let data = {
        category: category,
      };
      if (isEdit) {
        dispatch.claimTypesCategory.update({token, data, id: editData?.id});
      } else {
        dispatch.claimTypesCategory.add({token, data});
      }
    } else {
      setIsError(true);
    }
  };

  const onMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Claim Type Category'}
        labelStyle={styles.labelStyle}
        onMenuPress={onMenuPress}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={'Manage claim settings within the company here.'}
          style={{paddingHorizontal: 0}}
        />

        <CategoryName
          isView={isView}
          isError={isError}
          category={category}
          setCategory={setCategory}
        />

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={isView ? cancelBtn : onSaveBtnPress}
          label={'Save'}
          saveLoading={isCategoryLoading.add || isCategoryLoading.update}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ClaimTypeCategory;
