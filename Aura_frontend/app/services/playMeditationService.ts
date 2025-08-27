import { BASE_URL } from "@/constants/Api";

export const getAudioUrl = (filename: string) => {
    return `${BASE_URL}/api/audio/${filename}`;
};

export const getMeditationImageUrl = (imageId?: string | null) => {
    if(!imageId) return null;
    return `${BASE_URL}/api/images/${imageId}`;
};

export default { getAudioUrl, getMeditationImageUrl};