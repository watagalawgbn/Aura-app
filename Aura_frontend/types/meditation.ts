export type MeditationAudio = {
    _id: string;
    title: string;
    filename: string;
    image?: string | {_id: string} | null;
};