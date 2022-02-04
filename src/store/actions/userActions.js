import {AsyncStorage} from "react-native";


export const setFirstTime = (value)=>async (dispatch)=>{
    try{
        dispatch({
            type:"SET_FIRST_TIME",
            payload:value
        })
    }catch (e){

    }

}