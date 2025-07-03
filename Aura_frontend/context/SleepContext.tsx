// src/contexts/SleepContext.tsx
import React, { createContext, useContext, useState } from 'react';
import dayjs from 'dayjs';

type SleepData = {
  date: string;
  sleepStart: string;
  sleepEnd: string;
  duration: number;
};

type SleepContextType = {
  sleepRecords: SleepData[];
  addSleepRecord: (record: SleepData) => void;
};

const SleepContext = createContext<SleepContextType>({
  sleepRecords: [],
  addSleepRecord: () => {},
});

export const SleepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sleepRecords, setSleepRecords] = useState<SleepData[]>([]);

  const addSleepRecord = (record: SleepData) => {
    setSleepRecords(prev => {
      const filtered = prev.filter(r => r.date !== record.date);
      return [...filtered, record];
    });
  };

  return (
    <SleepContext.Provider value={{ sleepRecords, addSleepRecord }}>
      {children}
    </SleepContext.Provider>
  );
};

export const useSleep = () => useContext(SleepContext);
