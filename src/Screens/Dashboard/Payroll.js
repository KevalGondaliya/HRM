import React from 'react';
import { ScrollView } from 'react-native';
import {LineChart} from 'react-native-chart-kit';

import Box from '../../component/Box';

const Payroll = props => {
  return (
    <Box
      label={`Payroll`}
      children={
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={500}
            height={220}
            yAxisLabel="$"
            fromZero
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientToOpacity: 0,
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: () => `#000`,
              labelColor: () => `#000`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                strokeWidth: '2',
                stroke: '#000',
              },
            }}
            // bezier
            style={{
              marginTop: 5,
            }}
          />
        </ScrollView>
      }
    />
  );
};

export default Payroll;
