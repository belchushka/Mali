import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {userReducer} from "./reducers/userReducer";
import thunk from "redux-thunk";
import {animalReducer} from "./reducers/animalReducer";


const reducers = combineReducers({
    user:userReducer,
    animal:animalReducer
})

const store = createStore(reducers, compose(applyMiddleware(thunk)))


export default store