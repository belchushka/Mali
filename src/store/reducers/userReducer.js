


const initialState = {
    firstTime:true,
    loggedIn:false,
    userData:{},
    email:"",
    userAnimals:[]
}

export const userReducer = (state=initialState, action)=>{
    switch (action.type){
        case "SET_FIRST_TIME":
            return {
                ...state,
                firstTime:action.payload
            }
        case "SET_USER_DATA":
            return {
                ...state,
                userData:action.payload
            }
        case "SET_USER_EMAIL":
            return {
                ...state,
                email:action.payload
            }
        case "SET_LOGGED_IN":
            return {
                ...state,
                loggedIn: action.payload
            }
        case "EXIT_USER":
            return {
                ...state,
                userData: {},
                loggedIn: false
            }
        case "SET_USER_ANIMALS":
            return {
                ...state,
                userAnimals: action.payload
            }
        default:
            return state
    }
}

