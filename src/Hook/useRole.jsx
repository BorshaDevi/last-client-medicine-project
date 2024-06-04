import { useQuery } from "@tanstack/react-query";
import useSecret from "./useSecret";
import useAuth from "./useAuth";


const useRole = () => {
    const {user}=useAuth()
    const axiosSecret=useSecret()
   const {data : role =''}=useQuery({
        queryKey:['role',user?.email],
        
        queryFn:async()=>{
            const res =await axiosSecret.get('/users')
            console.log(res)
            return res
        }
   })
   return [role]
};

export default useRole;