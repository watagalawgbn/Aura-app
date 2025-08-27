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