// src/components/SleepChart.tsx
import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useSleep } from '../../context/SleepContext';
import dayjs from 'dayjs';

const screenWidth = Dimensions.get('window').width;

const SleepChart = () => {
  const { sleepRecords } = useSleep();

  const labels = [...Array(7)].map((_, i) =>
    dayjs().subtract(6 - i, 'day').format('dd')
  );

  const data = [...Array(7)].map((_, i) => {
    const date = dayjs().subtract(6 - i, 'day').format('YYYY-MM-DD');
    const record = sleepRecords.find(r => r.date === date);
    return record?.duration || 0;
  });

  return (
    <BarChart
          data={{
              labels,
              datasets: [{ data }],
          }}
          width={screenWidth - 40}
          height={200}
          fromZero
          yAxisSuffix="h"
          chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
              labelColor: () => '#000',
          }}
          style={{ marginVertical: 8, borderRadius: 8 }} yAxisLabel={''}    />
  );
};

export default SleepChart;
