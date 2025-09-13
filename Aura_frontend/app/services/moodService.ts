//services/moodService.ts

import apiClient from "./apiClient";

//--------------ADD MOOD----------------
export const logMood = async (mood: string): Promise<void> => {
  try {
    await apiClient.post(
      `/api/moods`,
      { mood } //selected mood in the body
    );
  } catch (error) {
    console.error("Error posting mood: ", error);
    throw new Error("Failed to log mood!");
  }
};

//--------------GET MOODS----------------
export const getMoods = async (range: "week" | "month" | "all" = "week") => {
  try {
    const res = await apiClient.get(`/api/moods?range=${range}`);
    return res.data; // backend returns array of moods
  } catch (error) {
    console.error("Error fetching moods: ", error);
    throw new Error("Failed to fetch mood!");
  }
};

//--------------GET CURRENT MOOD (latest)----------------
export const getCurrentMood = async (): Promise<string | null> => {
  try {
    const moods = await getMoods("week"); // fetch recent moods
    if (!moods.length) return null;
    return moods[moods.length - 1].mood; // take the latest mood
  } catch (error) {
    console.error("Error fetching current mood:", error);
   throw new Error("Failed to fetch the current mood!");
  }
};

export default { logMood, getMoods, getCurrentMood };
