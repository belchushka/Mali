import {AsyncStorage} from "react-native";
import {$authHost, $host} from "../../http/http";
import {
    EXIT_USER,
    SET_FIRST_TIME,
    SET_LOGGED_IN,
    SET_USER_ANIMALS,
    SET_USER_DATA,
    SET_USER_EMAIL,
    SET_USER_INFO
} from "../consts";


export const setFirstTime = (value)=>async (dispatch)=>{
    try{
        dispatch({
            type:SET_FIRST_TIME,
            payload:value
        })
    }catch (e){

    }

}

export const setLoggedIn = (value)=>async (dispatch)=>{
    try{
        dispatch({
            type:SET_LOGGED_IN,
            payload:value
        })
    }catch (e){

    }

}

export const setUserData = (value)=>async (dispatch)=>{
    try{
        dispatch({
            type:SET_USER_DATA,
            payload:value
        })
    }catch (e){

    }

}


export const register = (params)=>async (dispatch)=>{
    try{
        const data =await $host.post("authentication/registration",{
            ...params
        })
        dispatch({
            type:SET_USER_EMAIL,
            payload:params.email
        })
        return true
    }catch (e){
        throw e.response.data.message
    }

}

export const verifyEmail = (params)=>async (dispatch)=>{
    try{
        const data =await $host.post("authentication/check_verification_code",{
            ...params
        })
        await AsyncStorage.setItem("userData",JSON.stringify(data.data))
        await AsyncStorage.setItem("loggedIn","true")
        return data.data
    }catch (e){
        throw e.response.data.message
    }

}

export const verifyCode = (params)=>async (dispatch)=>{
    try{
        const data =await $host.post("user/password_change_request",{
            ...params
        })
    }catch (e){
        throw e.response.data.message
    }

}

export const changePassword = (params)=>async (dispatch)=>{
    try{
        const data =await $host.post("user/change_password",{
            ...params
        })
        return true
    }catch (e){
        throw e.response.data.message
    }

}

export const login = (params)=>async (dispatch)=>{
    try{
        const data =await $host.post("authentication/login",{
            ...params
        })
        const userData = data.data
        await AsyncStorage.setItem("userData",JSON.stringify(userData))
        await AsyncStorage.setItem("loggedIn","true")
        dispatch({
            type:SET_USER_DATA,
            payload:userData
        })
        dispatch({
            type:SET_LOGGED_IN,
            payload:true
        })
        return true
    }catch (e){
        throw e.response.data.message
    }

}

export const exitUser = ()=>async (dispatch)=>{
    try{
        await AsyncStorage.multiRemove(["loggedIn","userData"])
        dispatch({
            type:EXIT_USER,
        })
        return true
    }catch (e){
        return false
    }
}

export const getUserAnimals = (params)=>async (dispatch)=>{
    try{
        const data =await $authHost.get("user/user_ads")
        dispatch({
            type:SET_USER_ANIMALS,
            payload:data.data.ads
        })
        return data.data.ads
    }catch (e){
        return false
    }
}

export const getUserInfo = (params)=>async (dispatch)=>{
    try{
        const data =await $authHost.get("user/profile")
        dispatch({
            type:SET_USER_INFO,
            payload:data.data
        })
        return data.data
    }catch (e){
        return false
    }
}

export const saveUserInfo = (params)=>async (dispatch)=>{
    try{
        const xhr = new XMLHttpRequest();
        const token = JSON.parse(await AsyncStorage.getItem("userData")).accessToken

        const data = await new Promise((resolve, reject) => {
            xhr.onreadystatechange = e => {
                if (xhr.readyState !== 4) {
                    return;
                }

                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.responseText);
                }
            };
            xhr.open("POST","https://MALI.DEPRA.RU/api/user/change_user_data")
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.setRequestHeader("Authorization", "Bearer "+token);
            xhr.send(params);
        })
        return params
    }catch (e){
        throw e
    }
}

export const createNewAd = (params)=>async (dispatch)=>{
    try{
        const xhr = new XMLHttpRequest();
        const token = JSON.parse(await AsyncStorage.getItem("userData")).accessToken

        const data = await new Promise((resolve, reject) => {
            xhr.onreadystatechange = e => {
                if (xhr.readyState !== 4) {
                    return;
                }
                console.log(xhr);
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.responseText);
                }
            };
            xhr.open("POST","https://MALI.DEPRA.RU/api/user/create_ad")
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.setRequestHeader("Authorization", "Bearer "+token);
            xhr.send(params);
        })
    }catch (e){
        throw e
    }
}