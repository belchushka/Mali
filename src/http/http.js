import axios from "axios";
import {AsyncStorage} from "react-native";

const $authHost = axios.create({
    baseURL:"https://vm-20ed0b64.na4u.ru/api/",

})

const $host = axios.create({
    baseURL:"https://vm-20ed0b64.na4u.ru/api/",

})

$authHost.interceptors.request.use(async (config)=>{
    const data = await AsyncStorage.getItem("userData") || ""
    const token = JSON.parse(data).accessToken
    config.headers.authorization = "Bearer " + token
    return config
});

$authHost.interceptors.response.use(response => {
    return response;
}, async error => {
    throw error;
});

export {$authHost,$host}
