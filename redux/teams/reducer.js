import {ACTIONS} from "./actions";

const initialState = {
    teams: [],
}

const TeamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_TEAMS:
            return {
                teams: action.payload.teams,
            }
        default:
            return state
    }
}

export default TeamsReducer