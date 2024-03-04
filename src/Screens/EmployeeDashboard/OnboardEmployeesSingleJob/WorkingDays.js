import React from 'react';

import Box from '../../../component/Box';
import WeekDay from '../../../component/WeekDay';
import WeekDayTime from './WeekDayTime';

import styles from './style';
const WorkingDays = ({setCardDayArr, cardDayArr, isError}) => {
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
          />
        </>
      }
      childrenStyle={styles.childrenStyle}
    />
  );
};

export default WorkingDays;
