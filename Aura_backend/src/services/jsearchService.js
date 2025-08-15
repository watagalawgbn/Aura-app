const axios = require("axios");

const HOST = "jsearch.p.rapidapi.com";
const URL = `https://${HOST}/search`;

const searchJobs = async(params) => {
    const headers = {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": HOST,
    };
    const { data } = await axios.get(URL, { headers, params });
    return Array.isArray(data?.data) ? data.data: [];
}

module.exports = { searchJobs };