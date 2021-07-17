import {combineReducers, createStore} from 'redux'
import authReducer from "./auth/reducer";

const store = createStore(
    combineReducers({
        auth: authReducer,
    }),
    {},
)

export default store