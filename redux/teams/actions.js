export const ACTIONS = {
    SET_TEAMS:'SET_TEAMS',
}

export const setTeams = (teams) => {
    return {
        type: ACTIONS.SET_TEAMS,
        payload: {
            teams
        }
    }
}