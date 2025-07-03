import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions, View, Text } from 'react-native';
import { useSleep } from '../../context/SleepContext';
import dayjs from 'dayjs';

const screenWidth = Dimensions.get('window').width;

interface SleepData {
  date: string;
  duration: number;
}

interface SleepChartProps {
  selectedDate: string | Date;
  sleepRecords: SleepData[];
}

const SleepChart: React.FC<SleepChartProps> = ({ selectedDate, sleepRecords }) => {
  const startOfWeek = dayjs(selectedDate).startOf('week');
  const labels = [...Array(7)].map((_, i) =>
    startOfWeek.add(i, 'day').format('ddd')
  );

  const data = [...Array(7)].map((_, i) => {
    const date = startOfWeek.add(i, 'day').format('YYYY-MM-DD');
    const record = sleepRecords.find(r => r.date === date);
    return record?.duration || 0;
  });

  // Add a hidden data point with value 12 to force the scale to go up to 12 hours
  const chartData = {
    labels,
    datasets: [
      { 
        data: [...data, 15], // Add 12 to force scale
        withDots: false,
      }
    ],
  };

  return (
    <View style={{ marginTop: 20 }}>
      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={200}
        fromZero
        yAxisSuffix="h"
        segments={3} // This creates 3 segments: 0-4, 4-8, 8-12
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
          labelColor: () => '#000',
          propsForHorizontalLabels: {
            fontSize: 12,
          },
          // Force the chart to show specific y-axis labels
          formatYLabel: (value) => {
            const numValue = parseFloat(value);
            if (numValue === 0) return '0';
            if (numValue === 4) return '4';
            if (numValue === 8) return '8';
            if (numValue === 12) return '12';
            if (numValue === 15) return '15';
            return Math.round(numValue).toString();
          },
        }}
        style={{ marginVertical: 8, borderRadius: 8 }}
        yAxisLabel=""
      />
      <Text style={{ textAlign: 'center', fontSize: 14 }}>
        Sleep Data for Week Starting: {startOfWeek.format('MMMM D, YYYY')}
      </Text>
    </View>
  );
};

export default SleepChart;