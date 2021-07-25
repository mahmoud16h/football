import {ACTIONS} from "./actions";

const initialState = {
    contracts: [],
    contract: {},
    pendingTeamIds: [],
    completeContracts: [],
}

const ContractsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_CONTRACTS:
            return {
                ...state,
                contracts: action.payload.contracts,
            }
        case ACTIONS.SET_COMPLETE_TEAM_CONTRACTS:
            return {
                ...state,
                completeContracts: action.payload.completeContracts,
            }
        case ACTIONS.SET_PENDING_TEAM_CONTRACTS:
            return {
                ...state,
                pendingTeamIds: action.payload.teams,
            }
        default:
            return state
    }
}

export default ContractsReducer