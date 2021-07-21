import axios from "axios";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setTeams as setTeamsAction} from "./actions";
import {setTeam as setTeamAction} from "./actions";
import {setPendingTeamIds as setPendingTeamIdsAction} from "./actions";

const useTeams = () => {
    const { teams } = useSelector(state => state.teams);
    const { team } = useSelector(state => state.teams);
    const { pendingTeamIds } = useSelector(state => state.teams);
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

    const setPendingTeamIds = (products) => {
        dispatch(setPendingTeamIdsAction(products))
    }

    const getTeams = async (id) => {
        setIsLoading(true)
        const url = id ? `teams?playerId=${id}` : 'teams'
        try {
            const response = await axios.get(url)
            setTeams(response.data)
        } catch (e) {
            console.log(e.response?.data.message, 'error')
        }
        setIsLoading(false)
    }

    const getTeam = async (id) => {
        setIsLoadingTeam(true)
        const url = `teams/${id}`
        try {
            const response = await axios.get(url)
            setTeam(response.data)
        } catch (e) {
            console.log(e.response?.data.message, 'error')
        }
        setIsLoadingTeam(false)
    }

    const getPendingTeamRequests = async (id) => {
        setIsLoadingPendingTeams(true)
        try {
            const response = await axios.get(`contracts/player/${id}?status=pending`)
            setPendingTeamIds(response.data.map(contract => contract.teamId))
        } catch (e) {
            console.log('error', e)
        }
        setIsLoadingPendingTeams(false)

    }

    return {
        teams,
        team,
        pendingTeamIds,
        isLoading,
        isLoadingTeam,
        isLoadingPendingTeams,
        getTeams,
        getTeam,
        getPendingTeamRequests,
    }
}

export default useTeams