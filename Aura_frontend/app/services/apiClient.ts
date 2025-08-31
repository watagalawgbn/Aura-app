import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "@/constants/Api";

//create axios instance with base URL
const apiClient = axios.create({
    baseURL: BASE_URL,
});

//add a request interceptor that runs before every request
apiClient.interceptors.request.use(async (config) => {
    //get the saved authentication token from secureStore
    const token = await SecureStore.getItemAsync("authToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    } //if token exists, add it to the request headers
    return config;
});

export default apiClient;