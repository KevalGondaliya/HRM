import axios from 'axios';
import * as Progress from 'react-native-progress';
import { useDispatch, useSelector } from 'react-redux';
import { scale } from 'react-native-size-matters';
import React, { useEffect, useState } from 'react';
import DocumentPicker, { types } from 'react-native-document-picker';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../../theme';
import Header from '../../../component/Header';
import { API_URL } from '../../../utility/constant';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import OnboardEmployees from '../../../component/OnboardEmployees';

import styles from './style';

const EmpEmploymentDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const userId = route?.params?.id;
  const [fileResponse, setFileResponse] = useState('');
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState('');
  const token = useSelector(state => state.session?.token);
  const employeesInfo = useSelector(state => state.employees);

  useEffect(() => {
    if (employeesInfo.onBoard?.status == 200) {
      dispatch.employees.saveOnBoard(null);
      setProgress('');
      setFileResponse('');
    }
  }, [employeesInfo]);

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.csv,
        ],
      });

      setFileResponse(response[0]);
      setCount(count + 1);
    } catch (err) { }
  };

  const uploadProgress = progressEvent => {
    var Percentage = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100,
    );

    setProgress(Percentage);
  };

  useEffect(() => {
    if (fileResponse.length > 0) {
      uploadDocumentService();
    }
  }, [fileResponse]);

  const uploadDocumentService = async () => {
    const formData = new FormData();
    formData.append('document', fileResponse);
    await axios.post(
      API_URL + `/api/user-document-upload/${userId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: function (progressEvent) {
          uploadProgress(progressEvent);
        },
      },
    );
  };

  const cancelBtn = () => {
    navigation.goBack();
  };

  const submitBtn = () => {
    navigation.navigate('Onboard', { id: userId });
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Onboard Employees (Single)'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />

      <KeyboardAwareScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <OnboardEmployees
          index={3}
          description1={'Upload documents for employee (optional)'}
          description2={' '}
        />

        <View style={styles.containerView}>
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

          <View style={styles.midView} key={count}>
            {fileResponse != '' && (
              <View style={styles.uploadFileImgView}>
                <Image
                  source={require('../../../assets/uploadFile.png')}
                  style={styles.uploadFileImg}
                />
                <View style={styles.progressView}>
                  <Text style={styles.documentName}>{fileResponse?.name}</Text>

                  {progress != '' && (
                    <Progress.Bar
                      progress={progress || 0}
                      width={scale(235)}
                      unfilledColor={Colors.grey}
                      borderWidth={0}
                      style={{ marginVertical: scale(3) }}
                    />
                  )}
                  <View style={styles.mbView}>
                    <Text style={styles.mbTxt}>
                      {(fileResponse?.size / 1024 / 1024).toFixed(2)} MB
                    </Text>

                    <Text style={styles.uploadingTxt}>
                      Uploading...{progress}%
                    </Text>
                  </View>
                </View>
                <View style={styles.closeIconView}>
                  <Image
                    source={require('../../../assets/close.png')}
                    style={styles.closeIcon}
                  />
                </View>
              </View>
            )}
          </View>
        </View>

        <SaveCancelBtn
          cancelBtn={cancelBtn}
          submitBtn={submitBtn}
          label={'Next'}
          cancelLabel={'Back'}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmpEmploymentDetails;
