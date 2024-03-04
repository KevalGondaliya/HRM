import {View} from 'react-native';
import React, {Fragment} from 'react';

import Button from '../../../component/Button';

import styles from './style';

const Btn = ({onAddTextBoxPress}) => {
  return (
    <Fragment>
      <View style={styles.browseBtnView}>
        <Button
          label={'Add Text Box'}
          btnStyle={styles.removeBtn}
          labelStyle={styles.browseTxt}
          onPress={onAddTextBoxPress}
        />

        <Button
          label={'Add Text Area'}
          btnStyle={styles.removeBtn}
          labelStyle={styles.browseTxt}
        />
      </View>
      <View style={styles.browseBtnView}>
        <Button
          label={'Add Number Box'}
          btnStyle={[styles.removeBtn, styles.sBlack]}
          labelStyle={styles.browseTxt}
        />

        <Button
          label={'Add Rating'}
          btnStyle={styles.removeBtn}
          labelStyle={styles.browseTxt}
        />
      </View>
    </Fragment>
  );
};

export default Btn;
