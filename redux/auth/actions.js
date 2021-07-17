import axios from 'axios';
export const ACTIONS = {
    LOG_IN_SUCCESS: 'AUTH/LOG_IN_SUCCESS',
    LOG_OUT: 'AUTH/LOG_OUT',
}

export const LoginSuccessful = (data) => {
    if (isLocalStorageAvailable()) {
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('userId', data.id)
        localStorage.setItem('email', data.email)
    }
    axios.defaults.headers['x-access-token'] = data.accessToken;
    const payload = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        id: data.id,
    }

    return {
        type: ACTIONS.LOG_IN_SUCCESS,
        payload
    }
}


export const logout = () => {
    if (isLocalStorageAvailable()) {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
    }
    return {
        type: ACTIONS.LOG_OUT
    }
}

const isLocalStorageAvailable = () =>{
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}
