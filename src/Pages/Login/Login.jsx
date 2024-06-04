
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";


const Login = () => {
  const {loggingUser}=useAuth()
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    
    loggingUser(data.email,data.password)
    .then(res => {
      reset()
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
      navigate('/')

    })
    .catch(error => console.log(error))
    
  }
    return (
        <div>
          <div className="hero min-h-screen ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="https://i.ibb.co/Fqx9VRJ/20602920-6325227.jpg" className="lg:max-w-screen-sm " alt="" />
    <div className="card shrink-0 w-full lg:max-w-screen-sm  max-w-sm shadow-2xl bg-base-100">
        <SocialLogin></SocialLogin>
        <div className="divider">OR Email and password </div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register('email',{required:true})} placeholder="Email" className="input input-bordered"  />
          {errors.email && <span className="text-red-500">!Email is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register('password',{required:true})}  placeholder="password" className="input input-bordered"  />
          {errors.password && <span className="text-red-500">!password is required</span>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
        <input type="submit" className="btn bg-teal-400" value='Login'/>
        </div>
      </form>
      <p className="p-4 text-center">Do not have any account?<Link to='/signUp' className="font-bold  text-teal-600"><span>Sign Up</span></Link></p>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;