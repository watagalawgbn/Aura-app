//services.moodService.ts

import apiClient from "./apiClient";

export const logMood = async(mood: string): Promise<void> => {
    // send post request to backend to add mood
    try{ 
        await apiClient.post(
            `/api/moods`, 
            { mood } //selected mood in the body
        );
    } 
    //throw any errors occured if request failed
    catch(error){ 
        console.error("Error posting mood: ", error);
        throw new Error("Failed to log mood!");
    }
}

export default { logMood };