// src/contexts/SleepContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { BASE_URL } from "@/constants/Api";
import * as SecureStore from "expo-secure-store";

type SleepData = {
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
};

type SleepContextType = {
  sleepRecords: SleepData[];
  addSleepRecord: (record: SleepData) => void;
  fetchSleepData: () => Promise<void>;
};

const SleepContext = createContext<SleepContextType>({
  sleepRecords: [],
  addSleepRecord: () => {},
  fetchSleepData: async () => {},
});

export const SleepProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sleepRecords, setSleepRecords] = useState<SleepData[]>([]);

  const addSleepRecord = (record: SleepData) => {
    setSleepRecords((prev) => {
      const filtered = prev.filter((r) => r.date !== record.date);
      return [...filtered, record];
    });
  };

  const fetchSleepData = async () => {
    console.log("fetch sleep data triggered!!!");
    try {
      const token = await SecureStore.getItemAsync("authToken");

      console.log("Tokennnnn: ", token);
      if (!token) return;

      const res = await fetch(`${BASE_URL}/api/sleep`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch sleep data");
      }

      const data = await res.json();
      console.log("raw sleep dataaaa:", data);

      const transformed = data.map(
        (entry: { date: any; hours: any; startTime: any; endTime: any }) => ({
          date: dayjs(entry.date).format("YYYY-MM-DD"),
          duration: entry.hours,
          startTime: entry.startTime ?? "",
          endTime: entry.endTime ?? "",
        })
      );
      setSleepRecords(transformed);
    } catch (err) {
      console.error(" Error fetching sleep data: ", err);
    }
  };
  useEffect(() => {
    fetchSleepData();
  }, []);

  const contextValue = React.useMemo(
    () => ({ sleepRecords, addSleepRecord, fetchSleepData }),
    [sleepRecords]
  );

  return (
    <SleepContext.Provider value={contextValue}>
      {children}
    </SleepContext.Provider>
  );
};

export const useSleep = () => useContext(SleepContext);
