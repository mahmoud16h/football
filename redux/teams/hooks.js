import axios from "axios";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setTeams as setTeamsAction} from "./actions";
import {setTeam as setTeamAction} from "./actions";

const useTeams = ({ teamId, playerId }) => {
    const { teams } = useSelector(state => state.teams);
    const { team } = useSelector(state => state.teams);
    const { pendingTeamInvites } = useSelector(state => state.teams);
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingTeam, setIsLoadingTeam] = useState(true)
    const [isLoadingPendingTeams, setIsLoadingPendingTeams] = useState(true)
    const dispatch = useDispatch()


    const setTeams = (products) => {
        dispatch(setTeamsAction(products))
    }

    const setTeam = (products) => {
        dispatch(setTeamAction(products))
    }

    const getTeams = async () => {
        setIsLoading(true)
        const url = playerId ? `teams?playerId=${playerId}` : 'teams'
        try {
            const response = await axios.get(url)
            setTeams(response.data)
        } catch (e) {
            console.log(e.response?.data.message, 'error')
        }
        setIsLoading(false)
    }

    const getTeam = async () => {
        setIsLoadingTeam(true)
        const url = `teams?id=${teamId}`
        try {
            const response = await axios.get(url)
            setTeam(response.data)
        } catch (e) {
            console.log(e.response?.data.message, 'error')
        }
        setIsLoadingTeam(false)
    }

    const getPendingTeamInvites = async () => {
        setIsLoadingPendingTeams(true)
        const url = `teams?playerId=${playerId}`;
        try {
            const response = await axios.get(url)
            setTeams(response.data)
        } catch (e) {
            console.log(e.response?.data.message, 'error')
        }
        setIsLoadingPendingTeams(false)
    }

    return {
        teams,
        team,
        pendingTeamInvites,
        isLoading,
        isLoadingTeam,
        isLoadingPendingTeams,
        getTeams,
        getTeam,
        getPendingTeamInvites,
    }
}

export default useTeams