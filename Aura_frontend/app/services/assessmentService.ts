//services/assessmentService.tsx

import axios from 'axios';
import { BASE_URL } from '@/constants/Api';
import *  as SecureStore from "expo-secure-store";
import apiClient from './apiClient';

type Option = {
    label: string;
    value: number;
};

type Question = {
    id: string;
    question: string;
    type: "PHQ" | "GAD" | "DASS";
    options: Option[]; 
};

type Answer = {
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