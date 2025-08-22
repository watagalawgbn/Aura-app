import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "@/constants/Api";

const apiClient = axios.create({
    baseURL: BASE_URL,
});

//add token automatically to every request
apiClient.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("authToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;