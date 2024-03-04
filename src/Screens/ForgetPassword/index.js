import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Keyboard,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../theme';
// import Button from '../../component/Button';
import Header from '../../component/Header';
import TextInput from '../../component/TextInput';

import styles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {scale} from 'react-native-size-matters';

function ForgetPassword({navigation}) {
  const dispatch = useDispatch();
  const [email, setemail] = useState('');
  const [isError, setIsError] = useState(false);
  const isLoading = useSelector(
    state => state.loading.effects.session.authenticate,
  );
  const logo = require('../../assets/Hexagonal-infinite-logo.png');
  const handleSend = () => {
    if (email) {
      setIsError(false);
      dispatch.session.forgotPassword({email});
    } else {
      setIsError(true);
      dispatch.alerts.error({
        domain: 'user',
        message: 'Enter the E-mail Address',
      });
    }
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        label={'Forgot Password'}
        isBack
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 0.92, paddingHorizontal: scale(18)}}>
        <Pressable onPress={() => Keyboard.dismiss()}>
          <View style={styles.forgotImgContainer}>
            <View style={styles.ImageContainerMainView}>
              <Image
                style={styles.ImageLoader}
                resizeMode={'contain'}
                source={logo}
              />
            </View>

            <View style={styles.forgotTxtView}>
              <Text style={styles.ForgetPasswordTxt}>Forgot Password?</Text>

              <Text style={styles.SubTxt}>
                Provide your account's email for which you want to reset your
                Password !
              </Text>
            </View>
          </View>

          <View style={styles.textinputView}>
            <TextInput
              value={email}
              onChangeText={setemail}
              style={[
                {
                  marginTop: 40,
                  borderWidth: isError && email == '' ? 2 : 2,
                  borderColor: isError && email == '' ? 'red' : Colors.sBlack,
                },
              ]}
              placeholderTextColor="#333"
              placeholder="Email Address"
              keyboardType="email-address"
              enterKeyHint="next"
            />
            <TouchableOpacity
              style={styles.gradientLoginButton}
              onPress={() => handleSend()}>
              {isLoading ? (
                <ActivityIndicator color={'#fff'} size={'small'} />
              ) : (
                <Text style={{color: '#fff', fontSize: 17, fontWeight: 'bold'}}>
                  Send
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ForgetPassword;
