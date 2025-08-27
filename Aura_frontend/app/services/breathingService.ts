//services/breathingService.ts
import apiClient from "./apiClient";
import * as SecureStore from 'expo-secure-store';

export const saveBreathingSession = async (durationInSeconds: number) => {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.warn("User ID not found in SecureStore");
      return;
    }

    const res = await apiClient.post(`/api/breathing-sessions`, {
      userId,
      duration: durationInSeconds,
      pattern: { inhale: 4, hold: 7, exhale: 8 },
    });

    return res.data;
  } catch (err) {
    console.error("Error saving breathing session:", err);
    throw new Error("Failed to save breathing session!");
  }
};

export default {
  saveBreathingSession,
};
