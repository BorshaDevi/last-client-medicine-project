import axios from "axios";

const axiosPublic=axios.create({
    baseURL:'https://last-server-medicine-project.vercel.app'
})
const usePublie = () => {
   return axiosPublic;
};

export default usePublie;