//services/assessmentService.tsx

import axios from 'axios';
import { BASE_URL } from '@/constants/Api';

export const fetchAssessmentQuestions = async () => {
    const res = await axios.get(`${BASE_URL}/api/assessment/questions`);
    return res.data;
};

export default {
    fetchAssessmentQuestions
};