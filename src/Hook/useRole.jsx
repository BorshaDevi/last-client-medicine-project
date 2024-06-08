import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useSecret from "./useSecret";



const useRole = () => {
    const {user}=useAuth()
    const axiosSecret=useSecret()
    const {data : role =[],isLoading}=useQuery({
        queryKey:['role',user?.email],
        queryFn:async()=>{
            const data= await axiosSecret.get(`/users/${user.email}`)
           console.log(data.data)
            return data.data
        }
    })
   return {role , isLoading}
};

export default useRole;