import {ACTIONS} from "./actions";

const initialState = {
    teams: [],
    team: {},
    pendingTeamInvites: [],
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
        case ACTIONS.SET_PENDING_TEAM_INVITES:
            return {
                ...state,
                pendingTeamInvites: action.payload.teams,
            }
        default:
            return state
    }
}

export default TeamsReducer