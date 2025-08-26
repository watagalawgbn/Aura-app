//services.moodService.ts

import apiClient from "./apiClient";

//--------------ADD MOOD----------------
export const logMood = async(mood: string): Promise<void> => {
    try{ 
        await apiClient.post(
            `/api/moods`, 
            { mood } //selected mood in the body
        );
    } 
    catch(error){ 
        console.error("Error posting mood: ", error);
        throw new Error("Failed to log mood!");
    }
}

export default { logMood };