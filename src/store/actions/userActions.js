import {AsyncStorage} from "react-native";
import {$authHost, $host} from "../../http/http";


export const setFirstTime = (value)=>async (dispatch)=>{
    try{
        dispatch({
            type:"SET_FIRST_TIME",
            payload:value
        })
    }catch (e){

    }

}

export const setLoggedIn = (value)=>async (dispatch)=>{
    try{
        dispatch({
            type:"SET_LOGGED_IN",
            payload:value
        })
    }catch (e){

    }

}

export const setUserData = (value)=>async (dispatch)=>{
    try{
        dispatch({
            type:"SET_USER_DATA",
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
        console.log(data);
        dispatch({
            type:"SET_USER_EMAIL",
            payload:params.email
        })
    }catch (e){
        console.log(e);
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
            type:"SET_USER_DATA",
            payload:userData
        })
        dispatch({
            type:"SET_LOGGED_IN",
            payload:true
        })

        return true

    }catch (e){
        return false
    }

}

export const exitUser = ()=>async (dispatch)=>{
    try{
        await AsyncStorage.multiRemove(["loggedIn","userData"])
        dispatch({
            type:"EXIT_USER",
        })
        return true
    }catch (e){
        console.log(e);
        return false
    }
}

export const getUserAnimals = (params)=>async (dispatch)=>{
    try{
        const data =await $authHost.get("user/user_ads")
        dispatch({
            type:"SET_USER_ANIMALS",
            payload:data.data.ads
        })
        return data.data.ads
    }catch (e){
        console.log(e);
        return false
    }
}