import axios from "axios";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setTeams as setTeamsAction} from "./actions";
import {setTeam as setTeamAction} from "./actions";
import {getTeamApi, getTeamsApi} from '../../api/teams';

const useTeams = () => {
    const { teams, team } = useSelector(state => state.teams);
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingTeam, setIsLoadingTeam] = useState(true)
    const dispatch = useDispatch()


    const setTeams = (products) => {
        dispatch(setTeamsAction(products))
    }

    const setTeam = (products) => {
        dispatch(setTeamAction(products))
    }

    const getTeams = async (id) => {
        setIsLoading(true)
        try{
            const res = await getTeamsApi(id)
            setTeams(res.data)
        } catch (e) {
            console.log('Error getting teams', e)
        }
        setIsLoading(false)
    }

    const getTeam = async (id) => {
        setIsLoadingTeam(true)
        try{
            const res = await getTeamApi(id)
            setTeam(res.data)
        } catch (e) {
            console.log('Error getting team by ID', e)
        }
        setIsLoadingTeam(false)
    }

    return {
        teams,
        team,
        isLoading,
        isLoadingTeam,
        getTeams,
        getTeam,
    }
}

export default useTeams