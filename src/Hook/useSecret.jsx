import axios from 'axios';



const axiosSecret=axios.create({
    baseURL:'https://last-server-medicine-project.vercel.app'
})
const useSecret = () => {
    return axiosSecret;
};

export default useSecret;