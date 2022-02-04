
const initialState = {
    types:[],
    places:[],
    breeds:[],
    currentAnimalTypeId:null,
    currentAnimalTypeName:"",
    searchedAnimals:[],
    cities:[],
    animalInfo:{}
}

export const animalReducer = (state=initialState, action)=>{
    switch (action.type){
        case "SET_ANIMAL_TYPES":
            return {
                ...state,
                types:action.payload
            }
        case "SET_ANIMAL_PLACES":
            return {
                ...state,
                places:action.payload
            }
        case "SET_ANIMAL_BREEDS":
            return {
                ...state,
                breeds:action.payload
            }
        case "SET_CURRENT_ANIMAL_TYPE_ID_AND_NAME":
            return {
                ...state,
                currentAnimalTypeId:action.payload.id,
                currentAnimalTypeName: action.payload.name
            }

        case "SET_SEARCH_ANIMALS_RESULT":
            return {
                ...state,
                searchedAnimals:action.payload
            }
        case "SET_ANIMAL_CITIES":
            return {
                ...state,
                cities:action.payload
            }

        case "SET_ANIMAL_INFO":
            return {
                ...state,
                animalInfo: action.payload
            }
        default:
            return state
    }
}