//services/jobService.ts

import apiClient from "./apiClient";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type?: string | null;     // optional to be safe
  postedAt?: string;
  applyLink?: string;
  description?: string;           
  descriptionSnippet?: string; 
  remote?: boolean;
  employmentType?: string;
  [key: string]: any; 
};

export type JobRequest = {
    skills: string[];
    employmentType?: string;
    city?: string;
    page?: number;
};

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
        const results: Job[] = res.data.results || [];

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