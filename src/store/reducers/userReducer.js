import {
    EXIT_USER,
    SET_FIRST_TIME,
    SET_LOGGED_IN,
    SET_NEW_AD_DATA, SET_USER_ANIMALS,
    SET_USER_DATA,
    SET_USER_EMAIL_AND_PASSWORD, SET_USER_INFO
} from "../consts";


const initialState = {
    firstTime:true,
    loggedIn:false,
    userData:{},
    iconPath:{},
    name:"",
    surname:"",
    phone:"",
    phoneWhatsapp:"",
    email:"",
    password:"",
    userInfo:{},
    userAnimals:[],
    newAdData:{}
}

export const userReducer = (state=initialState, action)=>{
    switch (action.type){
        case SET_NEW_AD_DATA:
            return {
                ...state,
                newAdData: {
                    ...state.newAdData,
                    ...action.payload
                }
            }
        case SET_FIRST_TIME:
            return {
                ...state,
                firstTime:action.payload
            }
        case SET_USER_DATA:
            return {
                ...state,
                userData:action.payload
            }
        case SET_USER_EMAIL_AND_PASSWORD:
            return {
                ...state,
                email:action.payload.email,
                password: action.payload.password
            }
        case SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.payload
            }
        case EXIT_USER:
            return {
                ...state,
                userData: {},
                loggedIn: false
            }
        case SET_USER_ANIMALS:
            return {
                ...state,
                userAnimals: action.payload
            }
        case SET_USER_INFO:{
            return {
                ...state,
                userInfo: action.payload,
                name: action.payload.nameUser,
                surname:action.payload.surname,
                phone: action.payload.numberPhone,
                phoneWhatsapp: action.payload.numberPhone,
                email:action.payload.email,
                iconPath: action.payload.iconPath
            }
        }
        default:
            return state
    }
}

