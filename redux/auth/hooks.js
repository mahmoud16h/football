import {useSelector} from "react-redux";
import useContracts from '../contracts/hooks';
import useTeams from '../teams/hooks';
import {useState} from 'react';

const useAuth = () => {
    const { loggedIn, mobile, id, firstName } = useSelector(state => state.auth)
    const [loadingInitial, setLoadingInitial] = useState(false)
    const { getCompleteContractsRequests, getPendingContractsRequests } = useContracts()
    const { getTeams } = useTeams()

    const fetchInitialData = async () => {
        setLoadingInitial(true)
        try {
            await Promise.all([
                getTeams(id),
                getCompleteContractsRequests(id),
                getPendingContractsRequests(id)
            ]).then(() => setLoadingInitial(false)
            )
        } catch (e) {
            setLoadingInitial(false)
            console.log('Error loading initial Data', e)
        }
    }

    return { loggedIn, mobile, id, firstName, fetchInitialData, loadingInitial }
}

export default useAuth