import {combineReducers, createStore} from 'redux'
import authReducer from "./auth/reducer";
import teamsReducer from "./teams/reducer";

const store = createStore(
    combineReducers({
        auth: authReducer,
        teams: teamsReducer,
    }),
    {},
)

export default store