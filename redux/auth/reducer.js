import {ACTIONS} from "./actions";

const initialState = {loggedIn: false}
console.log('initialize')
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOG_IN_SUCCESS:
            return {
                loggedIn: true,
                mobile: action.payload.mobile,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                id: action.payload.id,
            }
        case ACTIONS.SET_INIT:
            return {
                loggedIn: true,
                mobile: action.payload.mobile,
                id: action.payload.id,
            }
        case ACTIONS.LOG_OUT:
            return {
                loggedIn: false,
                email: '',
                firstName: '',
                lastName: '',
                id: '',
            }
        default:
            return state
    }
}

export default AuthReducer