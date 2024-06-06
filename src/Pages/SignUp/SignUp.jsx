
import { Link } from "react-router-dom";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from '../../Hook/useAuth'
import Swal from "sweetalert2";


import usePublie from "../../Hook/usePublie";
import useSecret from "../../Hook/useSecret";
import axios from "axios";

const image_api=import.meta.env.VITE_iMG_API
const image_url=`https://api.imgbb.com/1/upload?key=${image_api}`
const SignUp = () => {
  const  {createUser,updateUser} =useAuth()
 const axiosPublic=usePublie()
const axiosSecret=useSecret()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = async(data) => {
    // const photo={photo : data.photo[0]}
    const formData=new FormData()
    formData.append('image',data.photo[0])
    const res=await axios.post(image_url,formData)
    const photo=res?.data?.data?.display_url
    console.log(data)
    if(res.data.success){
      createUser(data.email,data.password)
      .then(res => {
        updateUser(data?.name,photo)
        .then(async res => {
          const userData={
            name:data.name,
            email:data.email,
            role:data.role,
            
          }
          // console.log(userData)
          const userInfo= await axiosSecret.post('/user',userData)
          // console.log(userInfo.data)
          if(userInfo.data.insertedId){
            
            reset()
            Swal.fire({
      title: "Sign up successfully",
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
         
        
        })
        
      })
      .catch(error => console.log(error))
  
    }

    }

   
    return (
        <div>
        <div className="hero min-h-screen ">
<div className="hero-content flex-col lg:flex-row-reverse">
  <img src="https://i.ibb.co/yqHsL0p/4957412-Mobile-login-Cristina.jpg" className="lg:max-w-screen-sm " alt="" />
  <div className="card shrink-0 w-full lg:max-w-screen-sm max-w-sm shadow-2xl bg-base-100">
      <SocialLogin></SocialLogin>
      <div className="divider">OR Email and password </div>
    <form  onSubmit={handleSubmit(onSubmit)}className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input type="text" {...register ('name',{required:true})} placeholder="Enter your name" className="input input-bordered"  />
        {errors.name && <span className="text-red-500">!Name is required</span> }
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input type="email" {...register ('email',{required: true})} placeholder="email" className="input input-bordered"  />
        {errors.email && <span className="text-red-500">!Email is required</span> }
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Select your photo</span>
        </label>
        <input type="file" {...register ('photo',{required: true})} className="file-input w-full max-w-xs" />
        {errors.photo && <span className="text-red-500">!Photo is required</span> }
      </div>

      <select {...register ('role',{required: true})} className="select select-bordered w-full max-w-xs">
      <option  value=''>Select Your role</option>
      <option value='user' className="hover: bg-teal-300">User</option>
      <option value='seller' className="hover: bg-teal-300">Seller</option>
    </select>
    {errors.role && <span className="text-red-500">!Role is required</span> }
      
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input type="password" {...register ('password',{required: true , pattern:/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/})} placeholder="password" className="input input-bordered"  />
        {errors.password?.type === "required" && <span className="text-red-500">!Password is required</span> }
        {errors.password?.type === "pattern" && <span className="text-red-500">!Password should be one uppercase ,one lowercase,one special character,one number,and at least 8 character is required</span> }
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
        </label>
      </div>
      <div className="form-control mt-6">
        <input type="submit" className="btn bg-teal-400" value='Sign Up'/>
      </div>
    </form>
    <p className="p-4 text-center">Already have account?<Link to='/login' className="font-bold  text-teal-600"><span>Login</span></Link></p>
  </div>
</div>
</div>
      </div>
    );
};

export default SignUp;