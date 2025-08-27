//services/meditationService.ts

import { BASE_URL } from "@/constants/Api";
import apiClient from "./apiClient";
import { MeditationAudio } from "@/types/meditation";

//-----------------FETCH MEDITATION AUDIOS----------------
export const fetchMeditations = async(): Promise<MeditationAudio[]> => {
    try{
        const res = await apiClient.get(`/api/meditations`);
        return res.data;
    }
    catch(err){
        console.error("Failed to fetch meditations: ", err);
        throw new Error("Error fetching meditations!");
    }
}

//---------build image URL from an ID-------------
export const getImageUrl = (imageId?: string | null): string| null => {
    if(!imageId) return null;
    return `${BASE_URL}/api/images/${imageId}`;
};

//----------extract the imageId from string or object
export const getImageId = (image: string | {_id: string} | null |undefined): string => {
    if(!image) return "";
    if(typeof image === "string") return image;
    return image._id;
};

export default { fetchMeditations, getImageId, getImageUrl };