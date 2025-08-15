const axios = require("axios");

const searchJobs = async(params) => {
    const headers = {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
    };
    const { data } = await axios.get(URL, { headers, params });
    return Array.isArray(data?.data) ? data.data: [];
}

module.exports = { searchJobs };