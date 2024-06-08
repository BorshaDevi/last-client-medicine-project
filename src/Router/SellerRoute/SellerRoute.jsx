import { Navigate } from "react-router-dom";
import useRole from "../../Hook/useRole";
import useAuth from "../../Hook/useAuth";


const SellerRoute = ({children}) => {
    const {user,loading}=useAuth()
    const {role , isLoading}=useRole()
    if(loading || isLoading ){
        return <span className="loading loading-ring loading-lg text-3xl"></span>
    }
    if(user && role.role === 'seller' ){
        return children;
    }
    return <Navigate to='/login'></Navigate>
};

export default SellerRoute;