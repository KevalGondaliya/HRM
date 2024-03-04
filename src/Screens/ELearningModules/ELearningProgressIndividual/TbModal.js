import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Bar } from 'react-native-progress';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity } from 'react-native';

import Colors from '../../../theme';
import eye from '../../../assets/svg/whiteEye.svg';
import TableModal from '../../../component/TableModal';

import styles from './style';

const TbModal = ({ isModalVisible, onCloseModal, modalData }) => {
  return (
    <TableModal
      isModalVisible={isModalVisible}
      onCloseModal={onCloseModal}
      label={'E-Learning Progress'}
      children={
        <View style={{ padding: scale(15) }}>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>E-Learning ID</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.elearnId}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Module Title</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.elearnModTitle}
            </Text>
          </View>
          <View style={styles.modalView}>
            <Text style={[styles.userNameTxt1, { width: '35%' }]}>Progress</Text>
            <View style={[styles.headerDate1, styles.progress]}>
              <View style={[styles.progressSubView, { width: '65%' }]}>
                <Bar
                  progress={modalData.score / 100}
                  height={scale(12)}
                  borderWidth={0}
                  borderRadius={20}
                  color={Colors.greenWhite}
                  width={scale(98)}
                />
              </View>
              <Text style={styles.progressTxt}>{modalData.score} %</Text>
            </View>
          </View>
          <View style={styles.modalView}>
            <Text style={styles.userNameTxt1}>Score</Text>
            <Text numberOfLines={1} style={styles.userNameTxt1}>
              {modalData.score}
            </Text>
          </View>

          {/* <View style={styles.modalIconMainView}>
            <TouchableOpacity style={styles.editIconView}>
              <Icon
                name={'edit'}
                type={'materialicons'}
                color={Colors.white}
                size={styles.editIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.editIconView}>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.editIconView}>
              <Icon
                name={'delete'}
                type={'materialicons'}
                color={Colors.white}
                size={styles.editIcon}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      }
    />
  );
};

export default TbModal;
