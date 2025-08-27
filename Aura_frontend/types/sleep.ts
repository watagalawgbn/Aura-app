export type sleepData = {
  date: string;
  hours: number;
  startTime?: string;
  endTime?: string;
};

export type SleepRecord = {
  date: string;
  duration: number;
};

export type SleepChartProps = {
  selectedDate: string | Date; 
  sleepRecords: SleepRecord[]; 
};