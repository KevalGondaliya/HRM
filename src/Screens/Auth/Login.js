import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import styles from './style';
import Colors from '../../theme';
import Button from '../../component/Button';
import TextInput from '../../component/TextInput';

const logo = require('../../assets/Hexagonal-infinite-logo.png');

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const isSecureTextEntry = true;
  const [userName, setUserName] = useState('');
  const [pass, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const isLoading = useSelector(
    state => state.loading.effects.session.authenticate,
  );

  const loginBtnPress = () => {
    if (userName != '' && pass != '') {
      setIsError(false);
      var data = {
        email: userName.replace(' ', ''),
        password: pass,
      };
      dispatch.session.authenticate(data);
    } else {
      setIsError(true);
      dispatch.alerts.error({
        domain: 'user',
        message: 'Enter the user name and password',
      });
    }
  };
  const handleForgot = () => {
    navigation.navigate('ForgetPassword');
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
      <View style={styles.containerView}>
        <View style={styles.imagecontainer}>
          <Image
            style={styles.ImageLoader}
            resizeMode={'contain'}
            source={logo}
          />

          <Text style={styles.logotext}>Welcome to Hexagonal</Text>
          <Text style={styles.logotext}>HR Application</Text>
        </View>

        <View style={styles.loginFormTextInputContainer}>
          <TextInput
            onChangeText={setUserName}
            placeholder="Username"
            placeholderTextColor={'#000'}
            value={userName}
            keyboardType={'email-address'}
            style={[
              styles.textInput,
              {
                borderColor: isError && userName == '' ? 'red' : Colors.sBlack,
              },
            ]}
          />

          <TextInput
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={'#000'}
            value={pass}
            secureTextEntry={isSecureTextEntry}
            style={[
              styles.textInput,
              {
                borderColor: isError && pass == '' ? 'red' : Colors.sBlack,
              },
            ]}
          />

          <Button
            label={'Login'}
            onPress={loginBtnPress}
            isSpinner={isLoading}
            btnStyle={styles.loginBtn}
          />

          <TouchableOpacity
            style={styles.forgotContainer}
            onPress={handleForgot}>
            <Text style={styles.forgotTxt}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
