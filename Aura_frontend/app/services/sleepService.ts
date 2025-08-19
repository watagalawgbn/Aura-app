//services/sleepService.tsx

import dayjs from "dayjs";
import apiClient from "./apiClient";

type sleepData = {
  date: string;
  hours: number;
  startTime?: string;
  endTime?: string;
};

//fetch sleep data to chart
export const fetchSleepData = async () => {
  try{
    const res = await apiClient.get<sleepData[]>("/api/sleep");
    return res.data.map((entry) => ({
      date: dayjs(entry.date).format("YYYY-MM-DD"),
      duration: entry.hours,
      startTime: entry.startTime,
      endTime: entry.endTime
    }));
  }
  catch(e){
    console.error("Failed to fetch sleep data: ", e);
    throw new Error("Failed to fetch sleep data!");
  }
};

//add sleep records
export const postSleepRecord = async (record: {
  date: string;
  duration: number;
  startTime: string;
  endTime: string;
}) => {
  try{
    await apiClient.post("/api/sleep",{
      date: record.date,
      hours: record.duration,
      startTime: record.startTime,
      endTime: record.endTime,
    });
  }
  catch(e){
    console.error("Failed to save sleep record: ", e);
    throw new Error("Failed to save sleep record!");
  }
};

export default { fetchSleepData, postSleepRecord };
