import {combineReducers, createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from "./auth/reducer";
import modalReducer from "./modal/reducer";

const store = createStore(
    combineReducers({
        auth: authReducer,
        modal: modalReducer,
    }),
    {},
    composeWithDevTools()
)

export default store