import React from 'react';
import Modal from 'react-native-modal';
import { scale } from 'react-native-size-matters';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../theme';

const AddDeletModal = ({ visible, setVisible, handleCancel, handleDelete, isLoading }) => {
  return (
    <Modal
      backdropOpacity={0.7}
      backdropColor={Colors.black}
      isVisible={visible}
      animationType="slideInUp"
      onBackdropPress={() => {
        setVisible(false);
      }}
      onBackButtonPress={() => { }}
      transparent={true}>
      <View
        style={{
          backgroundColor: Colors.grey,
          borderRadius: scale(10),
          marginTop: 5,
          marginBottom: 0,
          borderWidth: 0,
          marginRight: scale(10),
          marginRight: 0,
          width: '100%',
          height: '100%',
          backgroundColor: null,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            minHeight: scale(50),
            backgroundColor: Colors.white,
            borderRadius: scale(15),
            padding: scale(20),
          }}>
          <Text
            style={{
              fontSize: scale(16),
              color: Colors.sBlack,
              textAlign: 'center',
              marginBottom: scale(30),
            }}>
            Are you sure, you want to delete?
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity style={{
              backgroundColor: '#414143',
              paddingHorizontal: scale(20),
              borderRadius: scale(20),
              paddingVertical: scale(10),
              width: scale(111),
              alignItems: 'center',
            }} onPress={handleCancel}>
              <Text style={{ color: '#fff' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isLoading ? true : false}
              style={{
                backgroundColor: '#69846E',
                paddingHorizontal: scale(20),
                borderRadius: scale(20),
                paddingVertical: scale(10),
                width: scale(111),
                alignItems: 'center',
              }} onPress={handleDelete}>
              {isLoading ? (
                <ActivityIndicator color={'#fff'} size={'small'} />
              ) : (
                <Text style={{ color: '#fff' }}>Delete</Text>)}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddDeletModal;
