import {combineReducers, createStore} from 'redux'
import authReducer from "./auth/reducer";
import teamsReducer from "./teams/reducer";
import contractsReducer from "./contracts/reducer";

const store = createStore(
  combineReducers({
    auth: authReducer,
    teams: teamsReducer,
    contracts: contractsReducer,
  }),
  {},
)

export default store