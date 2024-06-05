import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useSecret from "./useSecret";



const useRole = () => {
    const {user}=useAuth()
    const axiosSecret=useSecret()
    const {data : role =[]}=useQuery({
        queryKey:['role',user?.email],
        queryFn:async()=>{
            const data= await axiosSecret.get(`/users/${user.email}`)
           
            return data.data
        }
    })
   return {role}
};

export default useRole;