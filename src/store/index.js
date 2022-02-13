import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {userReducer} from "./reducers/userReducer";
import thunk from "redux-thunk";
import {animalReducer} from "./reducers/animalReducer";
import {alertReducer} from "./reducers/alertReducer";


const reducers = combineReducers({
    user:userReducer,
    animal:animalReducer,
    alert:alertReducer
})

const store = createStore(reducers, compose(applyMiddleware(thunk)))
export default store