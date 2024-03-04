import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Bar } from 'react-native-progress';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity } from 'react-native';

import Colors from '../../../theme';
import eye from '../../../assets/svg/whiteEye.svg';
import TableModal from '../../../component/TableModal';

import styles from './style';

const TbModal = ({
  isModalVisible,
  onCloseModal,
  modalData,
  eyeBtnPress,
}) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'E-Learning Progress'}
      children={
        <View style={{ padding: scale(15) }}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Employee Name :</Text>
            <Text
              numberOfLines={1}
              style={[styles.userNameTxt1, { textTransform: 'capitalize' }]}>
              {modalData.user_name || '-'}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Progress :</Text>
            <View style={[styles.headerDate1, styles.progress]}>
              <View style={[styles.progressSubView, { width: '65%' }]}>
                <Bar
                  progress={modalData.score / 100}
                  height={scale(12)}
                  borderWidth={0}
                  borderRadius={20}
                  color={Colors.greenWhite}
                  width={scale(150)}
                />
              </View>
              <Text style={styles.progressTxt}>{modalData.score} %</Text>
            </View>
          </View>

          <View style={[styles.modalIconMainView, { justifyContent: 'center' }]}>
            <TouchableOpacity onPress={eyeBtnPress} style={styles.editIconView}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
};

export default TbModal;
