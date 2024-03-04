import React from 'react';
import {scale} from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../theme';
import Button from './Button';
import TextInput from './TextInput';

const Form = props => {
  return (
    <View style={styles.formMainView}>
      <View style={styles.userNameMainView}>
        <View style={{width: '50%'}}>
          <Text style={styles.userNameTxt}>User Name</Text>

          <TextInput
            onChangeText={props.setUserName}
            value={props.userName}
            style={[
              styles.userNameTextInput,
              {
                borderWidth: props.isError && props.userName == '' ? 2 : 0,
                borderColor:
                  props.isError && props.userName == '' ? 'red' : null,
              },
            ]}
            placeholder={'Enter Username'}
          />
        </View>
        <View style={{width: '50%', paddingLeft: scale(5)}}>
          <Text style={styles.userNameTxt}>First Name</Text>

          <TextInput
            onChangeText={props.setFirstName}
            value={props.firstName}
            style={[
              styles.userNameTextInput,
              {
                marginRight: 0,
                borderWidth: props.isError && props.firstName == '' ? 2 : 0,
                borderColor:
                  props.isError && props.firstName == '' ? 'red' : null,
              },
            ]}
            placeholder={'Enter Frist Name'}
          />
        </View>
      </View>

      <View style={[styles.userNameMainView, {marginTop: scale(10)}]}>
        <View style={{width: '50%'}}>
          <Text style={styles.userNameTxt}>Last Name</Text>

          <TextInput
            onChangeText={props.setLastName}
            value={props.lastName}
            style={[
              styles.userNameTextInput,
              {
                borderWidth: props.isError && props.lastName == '' ? 2 : 0,
                borderColor:
                  props.isError && props.lastName == '' ? 'red' : null,
              },
            ]}
            placeholder={'Enter Last Name'}
          />
        </View>
        <View style={{width: '50%', paddingLeft: scale(5)}}>
          <Text style={styles.userNameTxt}>Gender</Text>

          <DropDownPicker
            placeholder="Select Gender"
            placeholderStyle={{
              color: Colors.primary,
            }}
            style={[
              styles.userNameTextInput,
              {
                marginRight: 0,
                borderWidth: props.isError && props.gender == '' ? 2 : 0,
                borderColor: props.isError && props.gender == '' ? 'red' : null,
                paddingHorizontal: scale(15),
              },
            ]}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            open={props.open}
            value={props.value}
            items={props.items}
            setOpen={props.setOpen}
            setValue={props.setValue}
            setItems={props.setItems}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
      </View>

      <View style={styles.emailView}>
        <Text style={styles.userNameTxt}>Email</Text>

        <TextInput
          onChangeText={props.setEmail}
          value={props.email}
          keyboardType={'email-address'}
          style={[
            styles.userNameTextInput,
            {
              marginRight: 0,
              borderWidth: props.isError && props.email == '' ? 2 : 0,
              borderColor: props.isError && props.email == '' ? 'red' : null,
            },
          ]}
          placeholder={'Enter Email'}
        />
      </View>

      <View style={styles.emailView}>
        <Text style={styles.userNameTxt}>Mobile Number</Text>

        <View style={{flexDirection: 'row', width: '100%'}}>
          <TextInput
            onChangeText={props.setCallingCode}
            value={props.callingCode}
            style={[
              styles.userNameTextInput,
              {
                borderWidth: props.isError && props.callingCode == '' ? 2 : 0,
                borderColor:
                  props.isError && props.callingCode == '' ? 'red' : null,
              },
            ]}
            keyboardType={'numeric'}
            maxLength={2}
            placeholder={'Ext'}
          />
          <TextInput
            onChangeText={props.setMobile}
            value={props.mobile}
            keyboardType={'numeric'}
            style={[
              styles.userNameTextInput,
              {
                marginRight: 0,
                width: '75%',
                borderWidth: props.isError && props.mobile == '' ? 2 : 0,
                borderColor: props.isError && props.mobile == '' ? 'red' : null,
              },
            ]}
            placeholder={'Enter Number'}
          />
        </View>
      </View>

      <View style={styles.emailView}>
        <Text style={styles.userNameTxt}>Employee's Status</Text>

        <DropDownPicker
          placeholder="Select Status"
          placeholderStyle={{
            color: Colors.primary,
          }}
          style={[
            styles.userNameTextInput,
            {
              marginRight: 0,
              borderWidth: props.isError && props.employeStatus == '' ? 2 : 0,
              borderColor:
                props.isError && props.employeStatus == '' ? 'red' : null,
              paddingHorizontal: scale(15),
            },
          ]}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          open={props.openStatus}
          value={props.statusValue}
          items={props.statusArr}
          setOpen={props.setOpenSatus}
          setValue={props.setStatusValue}
          setItems={props.setStatusArr}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
        />
      </View>

      <View style={styles.emailView}>
        <Text style={styles.userNameTxt}>Employee's DOB</Text>

        <View style={{flexDirection: 'row', width: '100%'}}>
          <TouchableOpacity onPress={props.onDDBtnPress}>
            <TextInput
              value={props.day}
              style={[
                styles.userNameTextInput,
                {
                  borderWidth: props.isError && props.day == '' ? 2 : 0,
                  borderColor: props.isError && props.day == '' ? 'red' : null,
                },
              ]}
              placeholder={'DD'}
              editable={false}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={props.onDDBtnPress}>
            <TextInput
              value={props.month}
              style={[
                styles.userNameTextInput,
                {
                  borderWidth: props.isError && props.month == '' ? 2 : 0,
                  borderColor:
                    props.isError && props.month == '' ? 'red' : null,
                },
              ]}
              placeholder={'MM'}
              editable={false}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={props.onDDBtnPress}>
            <TextInput
              value={props.year}
              style={[
                styles.userNameTextInput,
                {
                  width: scale(70),
                  borderWidth: props.isError && props.year == '' ? 2 : 0,
                  borderColor: props.isError && props.year == '' ? 'red' : null,
                },
              ]}
              placeholder={'YYYY'}
              editable={false}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.emailView}>
        <Text style={styles.userNameTxt}>Employee's Start Date</Text>

        <View style={{flexDirection: 'row', width: '100%'}}>
          <TouchableOpacity onPress={props.empDateBtnPress}>
            <TextInput
              value={props.startDay}
              style={[
                styles.userNameTextInput,
                {
                  borderWidth: props.isError && props.startDay == '' ? 2 : 0,
                  borderColor:
                    props.isError && props.startDay == '' ? 'red' : null,
                },
              ]}
              placeholder={'DD'}
              editable={false}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={props.empDateBtnPress}>
            <TextInput
              value={props.startMonth}
              style={[
                styles.userNameTextInput,
                {
                  borderWidth: props.isError && props.startMonth == '' ? 2 : 0,
                  borderColor:
                    props.isError && props.startMonth == '' ? 'red' : null,
                },
              ]}
              placeholder={'MM'}
              editable={false}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={props.empDateBtnPress}>
            <TextInput
              value={props.startYear}
              style={[
                styles.userNameTextInput,
                {
                  width: scale(70),
                  borderWidth: props.isError && props.startYear == '' ? 2 : 0,
                  borderColor:
                    props.isError && props.startYear == '' ? 'red' : null,
                },
              ]}
              placeholder={'YYYY'}
              editable={false}
            />
          </TouchableOpacity>
        </View>
      </View>

      {props.isButton && (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            btnStyle={[styles.doneBtn, {backgroundColor: null, borderWidth: 2}]}
            label={'cancel'}
            labelStyle={{color: Colors.sBlack}}
          />
          <Button
            btnStyle={styles.doneBtn}
            label={props.label}
            onPress={props.onPress}
            isSpinner={props.isSpinner}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  userNameTextInput: {
    backgroundColor: Colors.grey,
    borderRadius: scale(10),
    marginTop: 5,
    marginBottom: 0,
    borderWidth: 0,
    marginRight: scale(10),
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.lightRed,
    fontWeight: '600',
  },
  formMainView: {
    width: '90%',
    minHeight: scale(50),
    borderWidth: 2,
    borderRadius: scale(20),
    alignSelf: 'center',
    borderColor: Colors.lightRed,
    padding: scale(15),
  },
  userNameMainView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailView: {
    width: '100%',
    marginTop: scale(10),
  },
  dropDownContainerStyle: {
    height: scale(90),
    fontSize: 15,
    borderRadius: 7,
    backgroundColor: Colors.grey,
    padding: 10,
    marginBottom: scale(20),
    borderWidth: 0,
    marginTop: scale(0),
  },
  doneBtn: {
    height: scale(45),
    width: scale(130),
    borderRadius: scale(15),
    alignSelf: 'center',
    marginTop: scale(30),
  },
});
export default Form;
