import {Text} from 'react-native';
import React, {Fragment} from 'react';

import Box from '../../component/Box';

import style from './style';

const QuickLinks = props => {
  return (
    <Box
      label={`Quick Links`}
      children={
        <Fragment>
          <Text style={style.totalHeadCount} onPress={props.viewAllClaimsPress}>
            View All Claims
          </Text>

          <Text style={style.totalHeadCount} onPress={props.viewAllLeavesPress}>
            View All Leaves
          </Text>

          <Text style={style.totalHeadCount} onPress={props.viewAllEmpPress}>
            View All Employees
          </Text>

          {/* <Text style={style.totalHeadCount} onPress={props.onBoardBtnPress}>Onboard Employees</Text> */}
        </Fragment>
      }
    />
  );
};

export default QuickLinks;
