import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hook/useAuth";
import { useNavigate } from "react-router-dom";
import usePublie from "../../Hook/usePublie";
import Swal from "sweetalert2";
import useSecret from "../../Hook/useSecret";


const SocialLogin = () => {
    const {signGoogle}=useAuth()
    // const axiosPublic=usePublie()
    const axiosSecret=useSecret()
    const navigate=useNavigate()
    const handleGoogle=()=>{
        signGoogle()
        .then(async(res) => {
            console.log(res)
            const userData={
                name:res.user.displayName,
                email:res.user.email,
                role:'user',
            }
            const userInfo= await axiosSecret.post('/user',userData)
            if(userInfo.data.insertedId){
                Swal.fire({
                    title: "Login successfully",
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });   
            }
           
            navigate('/')
        })
        .catch(error => console.log(error))

    }
    return (
        <div>
            <p onClick={handleGoogle} className=" border border-teal-500 p-3 hover:border-teal-300 ml-20 mr-20 flex justify-center items-center"><FcGoogle /><span className="font-bold text-xl ml-4">GOOGLE</span></p>
        </div>
    );
};

export default SocialLogin;