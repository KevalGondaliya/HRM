import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native';

import Box from '../../component/Box';

import styles from './style';

const DepartmentBreakdown = ({ data }) => {

  const chartConfig = {
    backgroundColor: '#000',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: () => `#000`,
  };
  return (
    <Box
      label={`Department Breakdown`}
      children={
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.datasets?.length > 0 && (
            <BarChart
              style={styles.graphStyle}
              data={data}
              width={500}
              height={230}
              yAxisLabel="$"
              showBarTops={false}
              chartConfig={chartConfig}
              fromZero
              yAxisSuffix={''}
            />
          )}
        </ScrollView>
      }
    />
  );
};

export default DepartmentBreakdown;
