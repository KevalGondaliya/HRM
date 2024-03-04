import moment from 'moment';
import React, {Fragment} from 'react';
import {Text, View} from 'react-native';

import Box from '../../component/Box';

import style from './style';

const EmploymentUpdates = ({
  newEmployment,
  peopleLeaving,
  workPassExpiring,
}) => {
  return (
    <Box
      label={'Employment Updates'}
      children={
        <Fragment>
          <View style={style.boxContaintView1}>
            <Text style={[style.totalHeadCount]}>
              Total New Employment in {moment().format('MMMM')}
            </Text>
            <Text style={[style.totalHeadCount, style.newEmploymentTxt]}>
              {newEmployment}
            </Text>
          </View>

          <View style={style.boxContaintView1}>
            <Text style={style.totalHeadCount}>
              Number of People Leaving in {moment().format('MMMM')}
            </Text>
            <Text style={[style.totalHeadCount, style.newEmploymentTxt]}>
              {peopleLeaving}
            </Text>
          </View>

          <View style={[style.boxContaintView1, style.bottom]}>
            <Text style={style.totalHeadCount}>
              Total Work Pass Expiring in {moment().add(2, 'M').format('MMMM')}
            </Text>
            <Text style={[style.totalHeadCount, style.newEmploymentTxt]}>
              {workPassExpiring}
            </Text>
          </View>
        </Fragment>
      }
    />
  );
};

export default EmploymentUpdates;
