import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {Text, View, TouchableOpacity} from 'react-native';

import Colors from '../../../theme';
import eye from '../../../assets/svg/whiteEye.svg';
import TableModal from '../../../component/TableModal';
// import AddDeletModal from '../../../models/deletModal';

import styles from './style';

const TbModal = ({isModalVisible, onCloseModal, modalData}) => {
  // const [visible, setVisible] = useState(false);

  // const handleDelete = () => {
  //   setVisible(false);
  //   onDeleteBtnPress();
  // };

  // const handleCancel = () => {
  //   setVisible(false);
  // };

  return (
    <>
      <TableModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
        label={'Payslip'}
        children={
          <View style={{padding: scale(15)}}>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Payslip ID</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.id}
              </Text>
            </View>
            <View style={styles.modalView}>
              <Text style={styles.userNameTxt1}>Payslip Month</Text>
              <Text numberOfLines={1} style={styles.userNameTxt1}>
                {modalData.month}
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
                <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={styles.editIconView}
                onPress={() => {
                  setVisible(true);
                }}
                >
                <Icon
                  name={'delete'}
                  type={'materialicons'}
                  color={Colors.white}
                  size={styles.editIcon}
                />
              </TouchableOpacity> */}
            </View>
          </View>
        }
      />
      {/* <AddDeletModal
        visible={visible}
        setVisible={setVisible}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      /> */}
    </>
  );
};

export default TbModal;
