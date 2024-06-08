import { Navigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import useRole from "../../Hook/useRole";


const AdminRoute = ({children}) => {
    const {user,loading}=useAuth()
    const {role , isLoading}=useRole()
    if(loading || isLoading ){
        return <span className="loading loading-ring loading-lg text-3xl"></span>
    }
    if(user && role.role === 'admin' ){
        return children;
    }
    return <Navigate to='/login'></Navigate>
   

};

export default AdminRoute;