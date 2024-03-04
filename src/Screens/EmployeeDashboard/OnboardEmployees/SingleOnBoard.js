import React, {Fragment} from 'react';

import DropDowns from '../../../component/DropDowns';
import SaveCancelBtn from '../../../component/SaveCancelBtn';

import styles from './style';

const SingleOnBoard = ({
  isView,
  empArr,
  isError,
  empValue,
  setEmpValue,
  submitBtn,
  cancelBtn,
}) => {
  return (
    <Fragment>
      <DropDowns
        label={'Email*'}
        data={empArr || []}
        value={empValue}
        disable={isView ? true : false}
        onChange={item => {
          setEmpValue(item.value);
        }}
        placeholder="Select User Email…"
        style={isError && empValue == '' && styles.error}
      />

      <SaveCancelBtn
        cancelBtn={cancelBtn}
        submitBtn={submitBtn}
        style={styles.top}
        label={'Next'}
      />
    </Fragment>
  );
};

export default SingleOnBoard;
