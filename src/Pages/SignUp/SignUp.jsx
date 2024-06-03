import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";


const SignUp = () => {
    return (
        <div>
        <div className="hero min-h-screen ">
<div className="hero-content flex-col lg:flex-row-reverse">
  <img src="https://i.ibb.co/yqHsL0p/4957412-Mobile-login-Cristina.jpg" className="max-w-screen-sm " alt="" />
  <div className="card shrink-0 w-full max-w-screen-sm shadow-2xl bg-base-100">
      <p className=" border border-teal-500 p-3 hover:border-teal-300 ml-20 mr-20 flex justify-center items-center"><FcGoogle /><span className="font-bold text-xl ml-4">GOOGLE</span></p>
      <div className="divider">OR Email and password </div>
    <form className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input type="email" placeholder="email" className="input input-bordered" required />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input type="password" placeholder="password" className="input input-bordered" required />
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
        </label>
      </div>
      <div className="form-control mt-6">
        <button className="btn bg-teal-400">Sign Up</button>
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