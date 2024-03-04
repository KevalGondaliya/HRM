import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  ansArr,
  EditMultiCheckData,
  EditMultiChoiceData,
  editRadioButtonArr,
  multiCheckData,
  multiChoiceData,
  radioButtonsData,
} from '../../../dummyData';
import {useDispatch, useSelector} from 'react-redux';
import InsertMedia from './InsertMedia';
import Header from '../../../component/Header';
import QuestionTypeBtn from './QuestionTypeBtn';
import NewQuestionInput from './NewQuestionInput';
import QuestionBoxSlider from './QuestionBoxSlider';
import DropDowns from '../../../component/DropDowns';
import SaveCancelBtn from '../../../component/SaveCancelBtn';
import ScreenDescription from '../../../component/ScreenDescription';

import styles from './style';

function AddQuizzes({navigation}) {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState('');
  const [question, setQuestion] = useState('');
  const [elearnModule, setElearnModule] = useState('');
  const [elearnModuleArr, setElearnModuleArr] = useState([]);
  const [questionType, setQuestionType] = useState('Multiple-Choice');
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');
  const [textBoxAns, setTextBoxAns] = useState('');
  const [isTrue, setIsTrue] = useState(true);
  const [uploadDocument, setUploadDocument] = useState('');

  const [mutipleAns, setMutipleAns] = useState('');
  const [multiCheckDataArr, setMultiCheckDataArr] = useState(multiCheckData);
  const [radioButtonsDataArr, setRadioButtonsDataArr] =
    useState(radioButtonsData);
  const [multiChoiceDataArr, setMultiChoiceDataArr] = useState(multiChoiceData);
  const uploadDoc = useSelector(state => state.uploadDocument?.document);
  const isDocLoading = useSelector(
    state => state.loading.effects.uploadDocument.setDocument,
  );
  const elearnData = useSelector(state => state.elearning?.elearnData);
  const isLoading = useSelector(
    state => state.loading.effects.eLearningQuestion,
  );
  const eLearningQuestionData = useSelector(state => state.eLearningQuestion);

  const token = useSelector(state => state.session?.token);

  const onCancelBtnPress = () => {
    navigation.goBack();
    onCancel();
  };

  useEffect(() => {
    getQuestionData();
  }, []);

  const getQuestionData = () => {
    dispatch.elearning.get({token});
    dispatch.eLearningQuestion.get({token});
  };

  const onPressRadioButton = radioButtonsArray => {
    let selectedButton = radioButtonsArray.find(e => e.selected == true);
    selectedButton = selectedButton.value;
    setMutipleAns(selectedButton);
  };

  useEffect(() => {
    if (
      eLearningQuestionData?.addELearningQuestionData ||
      eLearningQuestionData?.isEditELearningQuestionData
    ) {
      getQuestionData();
      dispatch.eLearningQuestion.setELearningQuestion(false);
      dispatch.eLearningQuestion.setEditELearningQuestion(false);
      onCancel();
    }
  }, [eLearningQuestionData]);

  const dashboardBtnPress = () => {
    navigation.navigate('Dashboard');
    onCancel();
  };
  useEffect(() => {
    if (elearnData?.length > 0) {
      let arr = elearnData;
      let dropDownArr = [];

      for (let i = 0; i < arr?.length; i++) {
        dropDownArr.push({label: arr[i].elearnModTitle, value: arr[i].id});
      }
      setElearnModuleArr(dropDownArr);
    }
  }, [elearnData]);

  const onCancel = () => {
    setIsError(false);
    setIsEdit(false);
    setEditId('');
    setElearnModule('');
    setQuestionType('Multiple-Choice');
    setUploadDocument('');
    setMultiCheckDataArr(EditMultiCheckData);
    setMultiChoiceDataArr(EditMultiChoiceData);
    setMultiChoiceDataArr(EditMultiChoiceData);
    setMutipleAns('');
    setQuestion('');
    setTextBoxAns('');
    setRadioButtonsDataArr(editRadioButtonArr);
  };

  const onSubmitBtn = () => {
    if ((question && elearnModule) || textBoxAns) {
      let arr = [];
      if (questionType == 'Multiple-Check') {
        for (let i = 0; i < multiCheckDataArr?.length; i++) {
          if (multiCheckDataArr[i].isChecked) {
            arr.push(multiCheckDataArr[i].value);
          }
        }
      }

      let data = {
        elearnId: elearnModule,
        qnType: questionType,
        qnTitle: question,
        filePath: uploadDoc?.url || uploadDocument,
        option1:
          questionType == 'Multiple-Check'
            ? multiCheckDataArr[0].ans
            : multiChoiceDataArr[0].ans,
        option2:
          questionType == 'Multiple-Check'
            ? multiCheckDataArr[1].ans
            : multiChoiceDataArr[1].ans,
        option3:
          questionType == 'Multiple-Check'
            ? multiCheckDataArr[2].ans
            : multiChoiceDataArr[2].ans,
        option4:
          questionType == 'Multiple-Check'
            ? multiCheckDataArr[3].ans
            : multiChoiceDataArr[3].ans,
        answer:
          questionType == 'True-False'
            ? isTrue.toString()
            : questionType == 'Text-Box'
            ? textBoxAns
            : questionType == 'Multiple-Check'
            ? JSON.stringify(arr)
            : mutipleAns,
      };
      if (isEdit) {
        dispatch.eLearningQuestion.update({token, data, id: editId});
      } else dispatch.eLearningQuestion.add({token, data});
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const questionTypeBtnPress = item => {
    setQuestionType(item);
  };

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });
      const formData = new FormData();
      formData.append('document', response[0]);
      dispatch.uploadDocument.setDocument({token, formData});
      setUploadDocument(response[0].name);
      setCount(count + 1);
    } catch (err) {}
  };

  const onChange = (key, item, index) => {
    let rule = [...multiCheckDataArr];
    rule[index] = {...rule[index], [key]: item};
    setMultiCheckDataArr(rule);
  };

  const onMultiChoiceChange = (key, item, index) => {
    let rule = [...multiChoiceDataArr];
    rule[index] = {...rule[index], [key]: item};
    setMultiChoiceDataArr(rule);
  };

  const onQuestionPress = data => {
    setIsEdit(true);
    setEditId(data?.id);
    setElearnModule(data?.elearnId);
    setQuestionType(data?.qnType);
    setQuestion(data?.qnTitle);
    setUploadDocument(data?.filePath);
    if (data?.qnType == 'Text-Box') setTextBoxAns(data?.answer);
    if (data?.qnType == 'True-False') setIsTrue(data?.answer);
    if (data?.qnType == 'Multiple-Check') {
      let arr = JSON.parse(data.answer);

      setMultiCheckDataArr([
        {
          id: '1',
          value: 'A',
          isChecked: arr?.includes('A'),
          ans: data?.option1,
        },
        {
          id: '2',
          value: 'B',
          isChecked: arr?.includes('B'),
          ans: data?.option2,
        },
        {
          id: '3',
          value: 'C',
          isChecked: arr?.includes('C'),
          ans: data?.option3,
        },
        {
          id: '4',
          value: 'D',
          isChecked: arr?.includes('D'),
          ans: data?.option4,
        },
      ]);
    }
    if (data?.qnType == 'Multiple-Choice') {
      setMultiChoiceDataArr([
        {
          id: '1',
          value: 'A',
          isChecked: false,
          ans: data?.option1,
        },
        {
          id: '2',
          value: 'B',
          isChecked: false,
          ans: data?.option2,
        },
        {
          id: '3',
          value: 'C',
          isChecked: false,
          ans: data?.option3,
        },
        {
          id: '4',
          value: 'D',
          isChecked: false,
          ans: data?.option4,
        },
      ]);
      setMutipleAns(data.answer);
      setRadioButtonsDataArr([
        {
          id: '1',
          label: 'A',
          value: 'A',
          selected: data.answer == 'A' ? true : false,
        },
        {
          id: '2',
          label: 'B',
          value: 'B',
          selected: data.answer == 'B' ? true : false,
        },
        {
          id: '3',
          label: 'C',
          value: 'C',
          selected: data.answer == 'C' ? true : false,
        },
        {
          id: '4',
          label: 'D',
          value: 'D',
          selected: data.answer == 'D' ? true : false,
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Add Quizzes'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.subContainerView}>
        <ScreenDescription
          description1={'Manage the quizzes within the module here.'}
          description2={' Fill in the respective fields.'}
        />

        <DropDowns
          label={'E-learn Module*'}
          data={elearnModuleArr}
          placeholder="Select E-learn Module…"
          value={elearnModule}
          onChange={item => {
            setElearnModule(item.value);
          }}
          style={isError && elearnModule == '' && styles.error}
          isEdit={isEdit && elearnModule == ''}
          isError={isError && elearnModule === ''}
        />

        <QuestionTypeBtn
          onTypeBtnPress={questionTypeBtnPress}
          setIsError={setIsError}
          questionType={questionType}
        />

        <NewQuestionInput
          question={question}
          setQuestion={setQuestion}
          isError={isError}
        />

        <InsertMedia
          isError={isError}
          ansArr={ansArr}
          ans1={ans1}
          ans2={ans2}
          ans3={ans3}
          ans4={ans4}
          setAns1={setAns1}
          setAns2={setAns2}
          setAns3={setAns3}
          setAns4={setAns4}
          questionType={questionType}
          textBoxAns={textBoxAns}
          setTextBoxAns={setTextBoxAns}
          isTrue={isTrue}
          setIsTrue={setIsTrue}
          handleDocumentSelection={handleDocumentSelection}
          uploadDocument={uploadDocument}
          multiCheckDataArr={multiCheckDataArr}
          onPressRadioButton={onPressRadioButton}
          onChange={onChange}
          multiChoiceDataArr={multiChoiceDataArr}
          onMultiChoiceChange={onMultiChoiceChange}
          radioButtonsDataArr={radioButtonsDataArr}
        />

        <SaveCancelBtn
          label={'Save'}
          cancelBtn={onCancelBtnPress}
          submitBtn={() => onSubmitBtn()}
          style={styles.saveCancelBtnStyle}
          saveLoading={isLoading?.add || isLoading?.update || isDocLoading}
        />

        <TouchableOpacity
          onPress={dashboardBtnPress}
          style={[styles.saveCancelBtnStyle, styles.dashboardBtnStyle]}>
          <Text style={styles.dashboardBtnTxt}>Go To Dashboard</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <QuestionBoxSlider
        questionArr={eLearningQuestionData?.questionData}
        onQuestionPress={onQuestionPress}
      />
    </SafeAreaView>
  );
}

export default AddQuizzes;
