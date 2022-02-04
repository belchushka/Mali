


const initialState = {
    firstTime:true,
    loggedIn:false
}

export const userReducer = (state=initialState, action)=>{
    switch (action.type){
        case "SET_FIRST_TIME":
            return {
                ...state,
                firstTime:action.payload
            }
        default:
            return state
    }
}