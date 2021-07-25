export const ACTIONS = {
    SET_TEAMS:'SET_TEAMS',
    SET_TEAM:'SET_TEAM',
    SET_PENDING_TEAM_IDS: 'SET_PENDING_TEAM_IDS',
}

export const setTeams = (teams) => {
    return {
        type: ACTIONS.SET_TEAMS,
        payload: {
            teams
        }
    }
}

export const setTeam = (team) => {
    return {
        type: ACTIONS.SET_TEAM,
        payload: {
            team
        }
    }
}
