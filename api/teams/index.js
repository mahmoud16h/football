import axios from 'axios';

export const getTeamsApi = (id) => {
  const url = id ? `teams?playerId=${id}` : 'teams'
  return axios.get(url)
}

export const getTeamApi = (id) => axios.get(`teams/${id}`)

export const createTeamApi = (payload) =>  axios.post('teams', payload)

export const searchTeamsApi = (value) => {
  const url = `teams/search/${value}`
  return axios.get(url)
}
