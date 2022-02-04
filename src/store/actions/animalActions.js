import {$host} from "../../http/http";
import qs from "qs";

export const getAnimalTypes = (params) => async (dispatch) => {
    try{
        const data = await $host.get("ads/type_pet")
        dispatch({
            type:"SET_ANIMAL_TYPES",
            payload:data.data
        })
        return data.data
    }catch (e) {

    }
}

export const getAnimalPlaces = (params) => async (dispatch) => {
    try{
        const data = await $host.get("ads/where_animal_come")
        dispatch({
            type:"SET_ANIMAL_PLACES",
            payload:data.data
        })
        return data.data
    }catch (e) {

    }
}

export const getAnimalBreeds = (params) => async (dispatch) => {
    try{
        const data = await $host.get("ads/breed", {
            params:{
                idAnimalCategories:params.id
            }
        })
        dispatch({
            type:"SET_ANIMAL_BREEDS",
            payload:data.data
        })
        return data.data
    }catch (e) {

    }
}

export const setCurrentAnimalTypeIdAndName = (params) => (dispatch) => {
    try{
        dispatch({
            type:"SET_CURRENT_ANIMAL_TYPE_ID_AND_NAME",
            payload:params
        })
        return params

    }catch (e) {

    }
}

export const searchAnimals = (params) => async (dispatch) => {
    try{
        console.log(params);
        const data = await $host.get("ads/cards", {
            params:params,
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"SET_SEARCH_ANIMALS_RESULT",
            payload:data.data
        })
        return data.data

    }catch (e) {
        throw e
    }
}

export const getAnimalCities = (params) => async (dispatch) => {
    try{
        const data = await $host.get("ads/towns", {
            params:params
        })
        dispatch({
            type:"SET_ANIMAL_CITIES",
            payload:data.data
        })
        return data.data
    }catch (e) {

    }
}

export const getAnimal = (params) => async (dispatch) => {
    try{
        const data = await $host.get("ads/card", {
            params:params
        })
        dispatch({
            type:"SET_ANIMAL_INFO",
            payload:data.data
        })
        return data.data
    }catch (e) {

    }
}




