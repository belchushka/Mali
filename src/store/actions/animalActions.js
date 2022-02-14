import {$authHost, $host} from "../../http/http";
import qs from "qs";
import {
    SET_ANIMAL_BREEDS, SET_ANIMAL_CITIES, SET_ANIMAL_GENDERS, SET_ANIMAL_INFO,
    SET_ANIMAL_PLACES,
    SET_ANIMAL_TYPES,
    SET_CURRENT_ANIMAL_TYPE_ID_AND_NAME, SET_NEW_AD_DATA,
    SET_SEARCH_ANIMALS_RESULT
} from "../consts";

export const getAnimalTypes = (params) => async (dispatch) => {
    try{
        const data = await $host.get("ads/type_pet")
        dispatch({
            type:SET_ANIMAL_TYPES,
            payload:data.data
        })
        return data.data
    }catch (e) {
        throw e.response.data.message
    }
}

export const getAnimalPlaces = (params) => async (dispatch) => {
    try{
        const data = await $host.get("ads/where_animal_come")
        dispatch({
            type:SET_ANIMAL_PLACES,
            payload:data.data
        })
        return data.data
    }catch (e) {
        throw e.response.data.message
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
            type:SET_ANIMAL_BREEDS,
            payload:data.data
        })
        return data.data
    }catch (e) {
        throw e.response.data.message
    }
}

export const setCurrentAnimalTypeIdAndName = (params) => (dispatch) => {
    try{
        dispatch({
            type:SET_CURRENT_ANIMAL_TYPE_ID_AND_NAME,
            payload:params
        })
        return params

    }catch (e) {
        throw e
    }
}

export const searchAnimals = (params) => async (dispatch) => {
    try{
        const data = await $host.get("ads/cards", {
            params:params,
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:SET_SEARCH_ANIMALS_RESULT,
            payload:data.data.cards
        })
        return data.data

    }catch (e) {
        throw e.response.data.message
    }
}

export const getAnimalCities = (params) => async (dispatch) => {
    try{
        const data = await $host.get("ads/towns", {
            params:params
        })
        dispatch({
            type:SET_ANIMAL_CITIES,
            payload:data.data
        })
        return data.data
    }catch (e) {
        throw e.response.data.message
    }
}

export const getAnimalGender = (params) => async (dispatch) => {
    try{
        const data = await $host.get("ads/genders", {
            params:params
        })
        dispatch({
            type:SET_ANIMAL_GENDERS,
            payload:data.data
        })
        return data.data
    }catch (e) {
        throw e.response.data.message
    }
}

export const getAnimal = (params) => async (dispatch) => {
    try{
        const data = await $host.get("ads/card", {
            params:params
        })
        dispatch({
            type:SET_ANIMAL_INFO,
            payload:data.data
        })
        return data.data
    }catch (e) {
        throw e.response.data.message
    }
}

export const getAdminAnimal = (params) => async (dispatch) => {
    try{
        const data = await $authHost.get("admin/ad_need_approved", {
            params:params
        })
        dispatch({
            type:SET_ANIMAL_INFO,
            payload:data.data
        })
        return data.data
    }catch (e) {
        throw e.response.data.message
    }
}

export const approveAnimal = (params) => async (dispatch) => {
    try{
        const data = await $authHost.post("admin/approve_ad", {
            ...params
        })
        return data.data
    }catch (e) {
        console.log(e.response);
        throw e.response.data.message
    }
}

export const refuseAnimal = (params) => async (dispatch) => {
    try{
        const data = await $authHost.post("admin/reject_ad", {
            ...params
        })
        return data.data
    }catch (e) {
        console.log(e.response);
        throw e.response.data.message
    }
}

export const setNewAdData = (params) => async (dispatch) => {
    try{
      dispatch({
          type:SET_NEW_AD_DATA,
          payload:{
              ...params
          }
      })
    }catch (e) {
        throw e.response.data.message
    }
}






