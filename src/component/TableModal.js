import React from 'react';
import Modal from 'react-native-modal';

import Colors from '../theme';
import Box from '../component/Box';

const TableModal = ({isModalVisible, onCloseModal, label, children}) => {
  return (
    <Modal
      backdropOpacity={0.7}
      backdropColor={Colors.black}
      isVisible={isModalVisible}
      animationType="slideInUp"
      onBackdropPress={onCloseModal}
      transparent={true}>
      <Box
        label={label}
        isClose
        onCloseBtn={onCloseModal}
        children={children}
      />
    </Modal>
  );
};

export default TableModal;
