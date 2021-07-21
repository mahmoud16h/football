export const ACTIONS = {
    SET_TEAMS:'SET_TEAMS',
    SET_TEAM:'SET_TEAM',
    SET_PENDING_TEAM_INVITES: 'SET_PENDING_TEAM_INVITES',
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

export const setPendingTeamInvites = (teams) => {
    return {
        type: ACTIONS.SET_PENDING_TEAM_INVITES,
        payload: {
            teams
        }
    }
}