import React, {useEffect, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../../component/Header';
import UploadedDocuments from './UploadedDocuments';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import PropfileButton from '../../../component/PropfileButton';

import styles from './style';
import {useDispatch, useSelector} from 'react-redux';

const EmpDocuments = ({navigation}) => {
  const dispatch = useDispatch();
  const [uploadDocArr, setUploadDocArr] = useState([]);
  const [uploadDocument, setUploadDocument] = useState('');
  const token = useSelector(state => state.session?.token);
  const user = useSelector(state => state.session?.user);
  const [delId, setDelId] = useState('');
  const uploadDoc = useSelector(state => state.uploadDocument?.userDocument);
  const employeeProfile = useSelector(
    state => state.employeeProfile.personalInfo,
  );
  const isDocLoading = useSelector(
    state => state.loading.effects.uploadDocument.setUserDocument,
  );
  const isLoading = useSelector(
    state => state.loading.effects.employeeProfile.getPersonalInfo,
  );

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    dispatch.employeeProfile.getPersonalInfo({
      token,
      id: user?.id,
    });
  };

  useEffect(() => {
    getUserData();
  }, [uploadDoc]);

  useEffect(() => {
    if (employeeProfile?.documents) {
      setUploadDocArr(employeeProfile?.documents);
    }
  }, [employeeProfile]);

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.pdf],
      });
      console.log(response[0]);
      const formData = new FormData();
      formData.append('document', response[0]);

      dispatch.uploadDocument.setUserDocument({
        token,
        formData,
        id: user?.id,
      });

      setUploadDocument(response[0].name);
      setCount(count + 1);
    } catch (err) {}
  };

  const onDelete = item => {
    setDelId(item.id);
    dispatch.uploadDocument.delDocument({
      token,
      id: delId,
    });
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={
          employeeProfile?.staff_personal_infos[0]?.firstName +
            ' ' +
            employeeProfile?.staff_personal_infos[0]?.lastName || ''
        }
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />

      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl onRefresh={getUserData} refreshing={isLoading} />
        }
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <View style={styles.userImageMainView}>
          <View style={styles.userImageView}>
            <Image
              source={
                employeeProfile?.staff_personal_infos[0]?.photo != null
                  ? {uri: employeeProfile?.staff_personal_infos[0]?.photo}
                  : require('../../../assets/placeholder.png')
              }
              style={styles.userImage}
            />
          </View>
        </View>

        <PropfileButton
          isDocument={true}
          employmentDetails={() => {
            navigation.navigate('EmpEmploymentDetails');
          }}
          entitlementsBtnPress={() => {
            navigation.navigate('EmpEntitlements');
          }}
          personalDeails={() => {
            navigation.navigate('EmpProfile');
          }}
        />

        <UploadedDocuments
          data={uploadDocArr}
          onDelete={onDelete}
          delId={delId}
        />

        <TouchableOpacity
          onPress={handleDocumentSelection}
          style={styles.uploadImgView}>
          <Image
            source={require('../../../assets/upload.png')}
            style={styles.uploadImg}
          />
          <Text style={styles.drageTxt}>
            Drage & Drop or <Text style={styles.browseTxt}>Browse</Text> your
            files
          </Text>
        </TouchableOpacity>

        <SaveCancelBtn
          label={'Save'}
          cancelBtn={() => {
            navigation.goBack();
          }}
          submitBtn={() => {
            navigation.navigate('EmpEntitlements');
          }}
          saveLoading={isDocLoading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmpDocuments;
