import axios from 'axios';

const client = axios.create({
    baseURL: process.env.RAPIDAPI_BASE,
    headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
    },
    timeout: 10000,
});

export async function searchJobs(params){
    const {
        query, // string: e.g. "designer OR drawing OR creativity"
        page = 1,
        num_pages = 1,
        date_posted, // "all" | "today" | "3days" | "week" | "month"
        country,
        employement_types,  // e.g. "PART_TIME,CONTRACT,INTERNSHIP"
        radius // numeric
    } = params;

    const response = await client.get("/search", {
        params: {
        query,
        page,
        num_pages,
        date_posted,
        country,
        employement_types, 
        radius
        },
    });

    return response.data?.data ?? [];
}