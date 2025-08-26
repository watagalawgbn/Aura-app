//services/assessmentService.tsx

import apiClient from './apiClient';

export type Option = {
    label: string;
    value: number;
};

export type Question = {
    id: string;
    question: string;
    type: "PHQ" | "GAD" | "DASS";
    options: Option[]; 
};

export type Answer = {
    id: string;
    type: string;
    answer: number;
};

export const fetchAssessmentQuestions = async (): Promise<Question[]> => {
    try{
        const res = await apiClient.get(`/api/assessment`);
        return res.data;
    }
    catch(err){
        console.error("Failed to fetch assessment questions: ", err);
        throw new Error("Failed to fetch assessment questions!");
    }
};

//submit answers to backend
export const submitAssessmentAnswers = async(answers: Answer[]) => {
    try{
        const res = await apiClient.post(`/api/assessment/submit`, {answers});
        return res.data;
    }
    catch(err){
        console.error("Error submitting assessment answers:", err);
        throw new Error("Failed to submit assessment!");
    }
}

export default {
    fetchAssessmentQuestions, submitAssessmentAnswers
};