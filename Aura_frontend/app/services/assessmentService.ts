//services/assessmentService.tsx

import apiClient from './apiClient';
import { Question, Answer } from '@/types/assessment';

//--------------GET QUESTIONS----------------
export const fetchAssessmentQuestions = async (): Promise<Question[]> => {
    try{
        const res = await apiClient.get(`/api/assessment`);
        return res.data; //return an array of questions
    }
    catch(err){
        console.error("Failed to fetch assessment questions: ", err);
        throw new Error("Failed to fetch assessment questions!");
    }
};

//--------------SUBMIT ANSWERS----------------
export const submitAssessmentAnswers = async(answers: Answer[]) => {
    try{
        const res = await apiClient.post(`/api/assessment/submit`, {answers});
        return res.data; //return scores and severity results
    }
    catch(err){
        console.error("Error submitting assessment answers:", err);
        throw new Error("Failed to submit assessment!");
    }
}

export default {
    fetchAssessmentQuestions, submitAssessmentAnswers
};