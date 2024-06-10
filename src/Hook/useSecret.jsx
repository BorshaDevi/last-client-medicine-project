import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import useAuth from './useAuth';



const axiosSecret=axios.create({
    baseURL:'https://last-server-medicine-project.vercel.app'
})
const useSecret = () => {
  const navigate=useNavigate()
  const {logOut}=useAuth()
    axiosSecret.interceptors.request.use( (config) => {
      
        const token=localStorage.getItem('token')
        config.headers.authorization=`Bearer ${token}`
        console.log('Token to backend',token)
        return config;
      },  (error) => {
        
        return Promise.reject(error);
      });

      axios.interceptors.response.use((response) => {
      
        return response;
      }, async (error) =>{
        const status=error.response.status
        if( status === 401 || status === 403){
           logOut()
           .then(res => console.log(res))
           .catch(error => console.log(error))
          navigate('/login')
        }
        return Promise.reject(error);
      });
    return axiosSecret;
};

export default useSecret;