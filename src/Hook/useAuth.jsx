import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";


const useAuth = () => {
    const userAuth=useContext(AuthContext)
    return userAuth;
};

export default useAuth;