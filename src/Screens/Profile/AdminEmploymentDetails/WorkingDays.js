import React from 'react';

import WeekDay from './WeekDay';
import WeekDayTime from './WeekDayTime';
import Box from '../../../component/Box';

import styles from './style';
const WorkingDays = ({setCardDayArr, cardDayArr, isError, isView}) => {
  return (
    <Box
      label={'Working Days'}
      children={
        <>
          <WeekDay />
          <WeekDayTime
            setCardDayArr={setCardDayArr}
            cardDayArr={cardDayArr}
            isError={isError}
            isView={isView}
          />
        </>
      }
      childrenStyle={styles.childrenStyle}
    />
  );
};

export default WorkingDays;
