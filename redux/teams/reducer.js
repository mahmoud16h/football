import {ACTIONS} from "./actions";

const initialState = {
    teams: [],
    team: {},
    pendingTeamIds: [],
}

const TeamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_TEAMS:
            return {
                ...state,
                teams: action.payload.teams,
            }
        case ACTIONS.SET_TEAM:
            return {
                ...state,
                team: action.payload.team,
            }
        case ACTIONS.SET_PENDING_TEAM_IDS:
            console.log('actin khara')
            console.log('action.payload.teams', action.payload.teams)
            return {
                ...state,
                pendingTeamIds: action.payload.teams,
            }
        default:
            return state
    }
}

export default TeamsReducer