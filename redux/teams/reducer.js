import {ACTIONS} from "./actions";

const initialState = {
    teams: [],
    team: {}
}

const TeamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_TEAMS:
            return {
                teams: action.payload.teams,
            }
        case ACTIONS.SET_TEAM:
            return {
                team: action.payload.team,
            }
        default:
            return state
    }
}

export default TeamsReducer