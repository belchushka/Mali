import axios from "axios";
import {AsyncStorage} from "react-native";

const $authHost = axios.create({
    baseURL:"https://MALI.DEPRA.RU/api/"
})

const $host = axios.create({
    baseURL:"https://MALI.DEPRA.RU/api/"
})

$authHost.interceptors.request.use(async (config)=>{
    const token = await AsyncStorage.getItem("token") || ""
    config.headers.authorization = "Bearer " + token
    return config
});

$authHost.interceptors.response.use(response => {
    return response;
}, async error => {
    throw error;
});

export {$authHost,$host}
