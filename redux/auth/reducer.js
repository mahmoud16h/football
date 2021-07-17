import {ACTIONS} from "./actions";

const initialState = {
    loggedIn: !!localStorage.getItem('token'),
    email: localStorage.getItem('email') || '',
    id: localStorage.getItem('userId')
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOG_IN_SUCCESS:
            return {
                loggedIn: true,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
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