// src/context/SleepContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { BASE_URL } from "@/constants/Api";
import * as SecureStore from "expo-secure-store";

type SleepData = {
  date: string;
  startTime?: string;
  endTime?: string;
  duration: number;
};

type SleepContextType = {
  sleepRecords: SleepData[];
  fetchSleepData: () => void;
  addSleepRecord: (record: SleepData) => void;
};

const SleepContext = createContext<SleepContextType>({
  sleepRecords: [],
  fetchSleepData: () => {},
  addSleepRecord: () => {},
});

export const SleepProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sleepRecords, setSleepRecords] = useState<SleepData[]>([]);

  const fetchSleepData = async () => {
    console.log("🚀 Starting fetchSleepData...");
    try {
      const token = await getAuthToken();
      console.log("🔐 Token retrieved:", token ? "✅ EXISTS" : "❌ MISSING");

      const apiUrl = `${BASE_URL}/api/sleep`;
      console.log("🌐 Making request to:", apiUrl);
      console.log("🔐 Using token:", token);

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📊 API Response Status:", response.status);
      console.log("📊 API Response Data:", response.data);

      // Transform the backend data to match your frontend structure
      const transformedData = response.data.map((record: any) => ({
        date: record.date,
        duration: record.hours, // Backend uses 'hours', frontend expects 'duration'
        startTime: record.startTime ?? '', // Optional fields
        endTime: record.endTime ?? '',
      }));

      console.log("🔄 Transformed data:", transformedData);
      
      // Update the state with the fetched data
      setSleepRecords(transformedData);
      
    } catch (error) {
      console.error("❌ fetchSleepData ERROR:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response status:", error.response?.status);
        console.error("Response data:", error.response?.data);
      }
    }
  };

  const addSleepRecord = (record: SleepData) => {
    setSleepRecords((prev) => {
      const filtered = prev.filter((r) => r.date !== record.date);
      return [...filtered, record];
    });
  };

  useEffect(() => {
    fetchSleepData();
  }, []);

  return (
    <SleepContext.Provider
      value={{ sleepRecords, fetchSleepData, addSleepRecord }}
    >
      {children}
    </SleepContext.Provider>
  );
};

export const useSleep = () => useContext(SleepContext);

const getAuthToken = async (): Promise<string> => {
  try {
    const token = await SecureStore.getItemAsync("authToken");
    console.log("🔐 Retrieved token from SecureStore:", token);
    if (!token) throw new Error("Auth token not found");
    return token;
  } catch (err) {
    console.error("❌ Error getting token:", err);
    throw err;
  }
};