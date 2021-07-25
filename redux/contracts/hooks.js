import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPendingTeamIds as setPendingTeamIdsAction} from "./actions";
import {setCompleteTeamContracts as setCompletePlayerContractsAction} from "./actions";
import {getPendingContracts, getCompletePlayerContracts} from '../../api/contracts';

const useContracts = () => {
    const { pendingTeamIds, completeContracts } = useSelector(state => state.contracts);
    const [isLoadingPendingContracts, setIsLoadingPendingContracts] = useState(false)
    const [isLoadingCompleteContracts, setIsLoadingCompleteTeams] = useState(false)
    const dispatch = useDispatch()

    const setPendingTeamIds = (products) => {
        dispatch(setPendingTeamIdsAction(products))
    }
    const setCompleteTeamContracts = (products) => {
        dispatch(setCompletePlayerContractsAction(products))
    }

    const getPendingContractsRequests = async (id) => {
        setIsLoadingPendingContracts(true)
        try {
            const res = await getPendingContracts({playerId: id})
            setPendingTeamIds(res.data.map(contract => contract.teamId))
        } catch (e) {
        }
        setIsLoadingPendingContracts(false)
    }

    const getCompleteContractsRequests = async (id) => {
        setIsLoadingCompleteTeams(true)
        try {
            const res = await getCompletePlayerContracts({playerId: id})
            setCompleteTeamContracts(res.data)
        } catch (e) {
            console.log('Error getting complete contracts', e)
        }
        setIsLoadingCompleteTeams(false)
    }

    return {
        pendingTeamIds,
        completeContracts,
        isLoadingPendingContracts,
        isLoadingCompleteContracts,
        getPendingContractsRequests,
        getCompleteContractsRequests,
    }
}

export default useContracts