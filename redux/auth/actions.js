import axios from 'axios';
export const ACTIONS = {
    LOG_IN_SUCCESS: 'AUTH/LOG_IN_SUCCESS',
    LOG_OUT: 'AUTH/LOG_OUT',
    SET_INIT: 'AUTH/SET_INIT',
}

export const LoginSuccessful = (data) => {

    axios.defaults.headers['x-access-token'] = data.accessToken;
    const payload = {
        mobile: data.mobile,
        firstName: data.firstName,
        lastName: data.lastName,
        id: data.id,
    }

    return {
        type: ACTIONS.LOG_IN_SUCCESS,
        payload
    }
}

export const setInit = (payload) => ({
      type: ACTIONS.SET_INIT,
      payload
  }
)

export const logoutAction = () => ({
      type: ACTIONS.LOG_OUT
  }
)
