//services/jobService.ts

import apiClient from "./apiClient";
import { Job, JobRequest } from "@/types/job";

export const fetchJobs = async({
    skills,
    employmentType = "",
    city = "",
    page = 1,
}: JobRequest): Promise<Job[]> =>{
    try{
        const res = await apiClient.post(`/api/jobs/recommendations`,{
            skills,
            employmentType,
            city,
            page
        });
        //extract results safely(fallback empty array if none)
        const results: Job[] = res.data.results || [];

        //remove duplicate jobs by id
        const uniqueResults = results.filter(
            (job, index, self) => index === self.findIndex((j) => j.id === job.id)
        );
        return uniqueResults;
    }
    catch(err){
        console.error("Failed to fetch jobs:", err);
        throw new Error("Failed to fetch jobs!");
    }
}

export default { fetchJobs };