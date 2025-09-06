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

export const saveJob = async (userId: string, job: Job) => {
  try {
    const res = await apiClient.post("/api/jobs/save", { userId, job });
    return res.data;
  } catch (err: any) {
    console.error("Failed to save job:", err.response?.data || err.message);
    throw new Error("Failed to save job!");
  }
};

export const deleteSavedJob = async (id: string) => {
  try {
    const res = await apiClient.delete(`/api/jobs/saved/${id}`);
    return res.data;
  } catch (err: any) {
    console.error("Failed to delete saved job:", err.response?.data || err.message);
    throw new Error("Failed to delete saved job!");
  }
};


export default { fetchJobs, saveJob };