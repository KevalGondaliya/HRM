import React from 'react';
import Modal from 'react-native-modal';
import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, TouchableOpacity, View} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import whiteEye from '../../../assets/svg/whiteEye.svg';

import styles from './style';

const TableModal = ({isModalVisible, onCloseModal, modalData}) => {
  return (
    <Modal
      backdropOpacity={0.7}
      backdropColor={Colors.black}
      isVisible={isModalVisible}
      animationType="slideInUp"
      onBackdropPress={onCloseModal}
      transparent={true}>
      <Box
        label={'Payrolls'}
        isClose
        onCloseBtn={onCloseModal}
        children={
          <View style={{padding: scale(15)}}>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Employee Name</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.employeeName}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Take Home Pay</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.takeHomePay}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Gross Salary</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.grossSalary}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>CPF</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.cpf}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Bonus</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.bonus}
              </Text>
            </View>

            <View style={styles.modalIconMainView}>
              <TouchableOpacity style={styles.editIconView}>
                <Icon
                  name={'edit'}
                  type={'materialicons'}
                  color={Colors.white}
                  size={styles.editIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.editIconView}>
                <SvgXml xml={whiteEye} width={scale(22)} height={scale(22)} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.editIconView}>
                <Icon
                  name={'delete'}
                  type={'materialicons'}
                  color={Colors.white}
                  size={styles.editIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </Modal>
  );
};

export default TableModal;
