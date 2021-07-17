import {useSelector} from "react-redux";

const useAuth = () => {
    const { loggedIn, email, id } = useSelector(state => state.auth)
    return { loggedIn, email, id }
}

export default useAuth