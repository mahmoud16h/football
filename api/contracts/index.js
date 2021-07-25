import axios from 'axios';

export const acceptContract = ({teamId, playerId}) => axios.get(`contracts/accept/${teamId}/${playerId}`)

export const deleteContract = ({teamId, playerId}) => axios.delete(`contracts/reject/${teamId}/${playerId}`)

export const getPendingContracts = ({playerId}) => axios.get(`contracts/player/${playerId}?status=pending`)

export const getCompletePlayerContracts = ({playerId}) => axios.get(`contracts/player/${playerId}?status=complete`)

export const getCompleteTeamContracts = ({teamId}) => axios.get(`contracts/team/${teamId}?status=complete`)

export const fetchContracts = ({teamId}) => axios.get(`contracts/team/${teamId}`)

export const addPlayerContract = ({playerName, playerMobile, teamId }) => axios.post(`contracts`, {playerName, playerMobile, teamId })
