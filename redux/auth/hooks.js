import {useSelector} from "react-redux";

const useAuth = () => {
    const { loggedIn, mobile, id, firstName } = useSelector(state => state.auth)
    return { loggedIn, mobile, id, firstName }
}

export default useAuth