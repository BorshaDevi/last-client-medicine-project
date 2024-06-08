import { Navigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";


const PrivateRoute = ({children}) => {
    const {user,loading}=useAuth()
    if(loading){
        return <span className="loading loading-ring loading-lg text-3xl"></span>
    }
    if(user){
        return children;
    }
    return <Navigate to='/login'></Navigate>
   
};

export default PrivateRoute;