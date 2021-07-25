import axios from 'axios';

export const getPlayerMatches = ({teamIds}) => axios.get(`/matches/teams?teams=${teamIds}`)
