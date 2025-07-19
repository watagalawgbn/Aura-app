//services/sleepService.tsx
import { BASE_URL } from "@/constants/Api";
import * as SecureStore from "expo-secure-store";
import dayjs from "dayjs";

//fetch sleep data to chart
export const fetchSleepData = async () => {
  type sleepData = {
    date: string;
    hours: number;
    startTime?: string;
    endTime?: string;
  };

  const token = await SecureStore.getItemAsync("authToken");
  if (!token) return [];

  const res = await fetch(`${BASE_URL}/api/sleep`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch sleep data!");

  const data = await res.json();
  return data.map((entry: sleepData) => ({
    date: dayjs(entry.date).format("YYYY-MM-DD"),
    duration: entry.hours,
    startTime: entry.startTime ?? "",
    endTime: entry.endTime ?? "",
  }));
};

//add sleep records
export const postSleepRecord = async (record: {
  date: string;
  duration: number;
  startTime: string;
  endTime: string;
}) => {
  const token = await SecureStore.getItemAsync("authToken");
  if (!token) return;

  const res = await fetch(`${BASE_URL}/api/sleep`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: record.date,
      hours: record.duration,
      startTime: record.startTime,
      endTime: record.endTime,
    }),
  });
  if (!res.ok) throw new Error("Failed to save sleep record");
};

export default { fetchSleepData, postSleepRecord };
