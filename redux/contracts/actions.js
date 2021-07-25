export const ACTIONS = {
    SET_CONTRACTS:'SET_CONTRACTS',
    SET_CONTRACT:'SET_CONTRACT',
    SET_PENDING_TEAM_CONTRACTS: 'SET_PENDING_TEAM_CONTRACTS',
    SET_COMPLETE_TEAM_CONTRACTS: 'SET_COMPLETE_TEAM_CONTRACTS',
}

export const setContracts = (teams) => {
    return {
        type: ACTIONS.SET_CONTRACTS,
        payload: {
            teams
        }
    }
}

export const setContract = (team) => {
    return {
        type: ACTIONS.SET_CONTRACT,
        payload: {
            team
        }
    }
}

export const setPendingTeamIds = (teams) => {
    return {
        type: ACTIONS.SET_PENDING_TEAM_CONTRACTS,
        payload: {
            teams
        }
    }
}

export const setCompleteTeamContracts = (completeContracts) => {
    return {
        type: ACTIONS.SET_COMPLETE_TEAM_CONTRACTS,
        payload: {
            completeContracts
        }
    }
}