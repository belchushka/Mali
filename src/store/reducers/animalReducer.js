import {
    SET_ANIMAL_BREEDS, SET_ANIMAL_CITIES, SET_ANIMAL_GENDERS, SET_ANIMAL_INFO,
    SET_ANIMAL_PLACES, SET_ANIMAL_REGIONS,
    SET_ANIMAL_TYPES,
    SET_CURRENT_ANIMAL_TYPE_ID_AND_NAME,
    SET_SEARCH_ANIMALS_RESULT
} from "../consts";

const initialState = {
    types:[],
    places:[],
    breeds:[],
    genders:[],
    currentAnimalTypeId:null,
    currentAnimalTypeName:"",
    searchedAnimals:[],
    cities:[],
    animalInfo:{},
    regions:[]
}

export const animalReducer = (state=initialState, action)=>{
    switch (action.type){
        case SET_ANIMAL_TYPES:
            return {
                ...state,
                types:action.payload
            }
        case SET_ANIMAL_PLACES:
            return {
                ...state,
                places:action.payload
            }
        case SET_ANIMAL_BREEDS:
            return {
                ...state,
                breeds:action.payload
            }
        case SET_CURRENT_ANIMAL_TYPE_ID_AND_NAME:
            return {
                ...state,
                currentAnimalTypeId:action.payload.id,
                currentAnimalTypeName: action.payload.name
            }

        case SET_ANIMAL_GENDERS:
            return {
                ...state,
                genders: action.payload
            }

        case SET_SEARCH_ANIMALS_RESULT:
            return {
                ...state,
                searchedAnimals:action.payload
            }
        case SET_ANIMAL_CITIES:
            return {
                ...state,
                cities:action.payload
            }
        case SET_ANIMAL_REGIONS:
            return {
                ...state,
                regions:action.payload
            }

        case SET_ANIMAL_INFO:
            return {
                ...state,
                animalInfo: action.payload
            }
        default:
            return state
    }
}