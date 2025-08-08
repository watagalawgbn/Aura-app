// import { useState, useEffect } from "react";
// import axios from "axios";
// import { RAPID_API_KEY } from "@env";

// const rapidApiKey = RAPID_API_KEY;

// ----old version

// const useFetch = (endpoint) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const options = {
//     method: "GET",
//     url: `https://jsearch.p.rapidapi.com/${endpoint}`,
//     params: { ...query },
//     headers: {
//       "x-RapidAPI-Key": rapidApiKey,
//       "x-RapidAPI-Host": "jsearch.p.rapidapi.com",
//     },
//   };
//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.request(options);

//       setData(response.data.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.log("Error: ", error);
//       alert("There is an error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const refetch = () => {
//     fetchData();
//   };

//   return { data, isLoading, error, refetch };
// };

// export default useFetch;



//------new code snippet 

// const useFetch = (endpoint) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

// const http = require("https");

// const options = {
//   method: "GET",
//   hostname: "jsearch.p.rapidapi.com",
//   port: null,
//   path: "/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all",
//   headers: {
//     "x-rapidapi-key": rapidApiKey,
//     "x-rapidapi-host": "jsearch.p.rapidapi.com",
//   },
// };

// const req = http.request(options, function (res) {
//   const chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     const body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });

// req.end();
// };


import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from "@env";

// const rapidApiKey = RAPID_API_KEY;

// Optional: define the Job type more strictly based on your needs
interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_city: string;
  [key: string]: any;
}

// Accept dynamic query parameters (object)
const useFetch = (
  endpoint: string = "search", // default endpoint
  queryParams: Record<string, string | number> = {} // dynamic query object
) => {
  const [data, setData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`https://jsearch.p.rapidapi.com/${endpoint}`, {
        params: queryParams,
        headers: {
          "x-rapidapi-key": '82b1b7f427mshe3bb229ad7c9e07p17098cjsn86c1d98af42d',
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
      });

      setData(response.data.data);
    } catch (err: any) {
      setError(err);
      console.error("API error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // re-run if query params or endpoint change
  }, [endpoint, JSON.stringify(queryParams)]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
