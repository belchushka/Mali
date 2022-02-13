import {SET_ALERT_MESSAGE, SET_ALERT_TITLE, SET_ALERT_VISIBLE} from "../consts";

const initialState = {
    alertTitle:"",
    alertMessage:"",
    alertVisible:false
}

export const alertReducer = (state=initialState,action)=>{
    switch (action.type){
        case SET_ALERT_TITLE:
            return {
                ...state,
                alertTitle: action.payload
            }
        case SET_ALERT_MESSAGE:
            return {
                ...state,
                alertMessage: action.payload
            }
        case SET_ALERT_VISIBLE:
            return {
                ...state,
                alertVisible: action.payload
            }
        default:{
            return state
        }
    }
}