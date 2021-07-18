import axios from "axios";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setTeams as setTeamsAction} from "./actions";

const useTeams = (id) => {
    const { teams } = useSelector(state => state.teams);
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()


    const setTeams = (products) => {
        dispatch(setTeamsAction(products))
    }

    const getTeams = async () => {
        setIsLoading(true)
        const url = id ? `teams?id=${id}` : 'teams'
        try {
            const response = await axios.get(url)
            setTeams(response.data)
        } catch (e) {
            console.log(e.response?.data.message, 'error')
        }
        setIsLoading(false)
    }

    return {
        teams,
        isLoading,
        getTeams,
    }
}

export default useTeams