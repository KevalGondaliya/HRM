import {Text} from 'react-native';
import React, {Fragment} from 'react';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import TextInput from '../../../component/TextInput';

import styles from './style';

const Category = ({isError, setCategory, category, isView}) => {
  return (
    <Box
      label={'Category'}
      children={
        <Fragment>
          <Text style={styles.userNameTxt}>Category*</Text>

          <TextInput
            onChangeText={setCategory}
            value={category}
            isError={isError && category == ''}
            style={styles.userNameTextInput}
            placeholder={'Enter Category Name'}
            placeholderTextColor={Colors.lightRed}
            editable={isView ? false : true}
          />
        </Fragment>
      }
    />
  );
};

export default Category;
