//services.moodService.tsx

import axios from "axios";
import { BASE_URL } from "@/constants/Api";
import * as SecureStore from "expo-secure-store";

export const logMood = async(mood: string): Promise<void> => {

    // retrieving token
    const token = await SecureStore.getItemAsync("authToken");

    // handle the error if token not found
    if(!token){ 
        throw new Error("Authentication token not found!");
    }

    // send post request to backend to add mood
    try{ 
        await axios.post(`${BASE_URL}/api/moods`,           //API end point
            { mood },                                      //selected mood in the body
            { headers: { Authorization: `Bearer ${token}`}} // auth header
        );
    } 
    //throw any errors occured if request failed
    catch(error: any){ 
        console.error("Error posting mood: ", error);
        throw new Error("Failed to log mood!");
    }
}

export default { logMood };